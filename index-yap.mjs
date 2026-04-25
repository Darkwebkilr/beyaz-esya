import { google } from "googleapis";
import fs from "fs";
import { parseStringPromise } from "xml2js";
import dotenv from "dotenv";

dotenv.config();
// --- AYARLAR ---

const SITEMAP_PATH = process.env.SITEMAP_PATH;
// const JSON_FILE = process.env.JSON_FILE; // Bu satır artık kullanılmıyor
const DB_FILE = process.env.DB_FILE;

// .env dosyasından kimlik bilgilerini güvenli şekilde al
if (!process.env.GOOGLE_CREDENTIALS_JSON) {
  throw new Error(
    "GOOGLE_CREDENTIALS_JSON ortam değişkeni bulunamadı. .env dosyasını kontrol edin.",
  );
}
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

async function startIndexing() {
  try {
    // 1. Daha önce gönderilen URL'leri yükle
    let indexedHistory = [];
    if (fs.existsSync(DB_FILE)) {
      indexedHistory = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    }

    // 2. Sitemap Okuma
    if (!fs.existsSync(SITEMAP_PATH)) {
      console.log(`❌ Hata: ${SITEMAP_PATH} bulunamadı!`);
      return;
    }
    const xmldata = fs.readFileSync(SITEMAP_PATH, "utf-8");
    const result = await parseStringPromise(xmldata);

    // Sitemap'teki linkleri al ve domain düzeltmesi yap (opsiyonel ama garanti)
    const rawUrls = result.urlset.url.map((item) => item.loc[0]);
    const allUrls = rawUrls.map((url) =>
      url.replace("manisabeyazesyaservisi.com", "manisamerkezservisi.com"),
    );

    // 3. Sadece yeni olanları filtrele
    const newUrls = allUrls.filter((url) => !indexedHistory.includes(url));

    console.log(`📊 Toplam URL: ${allUrls.length}`);
    console.log(`✅ Zaten Indexlenmiş: ${indexedHistory.length}`);
    console.log(`🚀 Yeni Gönderilecek: ${newUrls.length}`);

    if (newUrls.length === 0) {
      console.log("ℹ️ Gönderilecek yeni URL bulunamadı. İşlem durduruldu.");
      return;
    }

    // 4. Auth Yapılandırması
    const auth = new google.auth.GoogleAuth({
      credentials, // keyFile yerine credentials objesini direkt veriyoruz
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });
    const authClient = await auth.getClient();
    const indexing = google.indexing("v3");

    // 5. URL'leri Gönder
    for (const url of newUrls) {
      try {
        const response = await indexing.urlNotifications.publish({
          auth: authClient,
          requestBody: {
            url: url,
            type: "URL_UPDATED",
          },
        });

        console.log(`✅ OK: ${url}`);

        // Başarılıysa tarihe ekle ve dosyayı güncelle
        indexedHistory.push(url);
        fs.writeFileSync(DB_FILE, JSON.stringify(indexedHistory, null, 2));
      } catch (error) {
        console.log(
          `❌ Hata (${url}): ${error.response?.data?.error?.message || error.message}`,
        );
        // Eğer kota dolduysa döngüyü kır ki boşuna hata basmasın
        if (error.response?.status === 429) {
          console.log("⚠️ Günlük kota doldu!");
          break;
        }
      }
    }
    console.log("🏁 İşlem tamamlandı.");
  } catch (error) {
    console.log(`💥 Kritik Hata: ${error.message}`);
  }
}

startIndexing();
