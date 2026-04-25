import { contact, brands } from "@/app/constants";
import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Manisa Teknik Servis",
    image: "https://manisamerkezservisi.com/beyaz-esya-tamiri.jpg",
    telephone: contact.phoneCall,
    url: "https://manisamerkezservisi.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Merkez Mahalle No:1",
      addressLocality: "Manisa",
      postalCode: "45000",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.614,
      longitude: 27.429,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:30",
      closes: "20:00",
    },
  };

  return (
    <footer
      id="iletisim"
      className="py-24 px-6 max-w-7xl mx-auto text-center border-t border-slate-100"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="text-5xl md:text-9xl font-black text-slate-100 uppercase italic mb-8 tracking-tighter">
        Hemen Arayın
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-12">
        <div>
          <h6 className="text-primary font-black uppercase tracking-widest mb-6 italic">
            Manisa Ofis
          </h6>
          <p className="text-slate-600 text-lg font-medium">
            Şehzadeler, Yunusemre ve civar tüm ilçelere aynı gün gezici servis
            ekiplerimiz ulaşmaktadır.
          </p>
        </div>
        <div>
          <h6 className="text-primary font-black uppercase tracking-widest mb-6 italic">
            Çalışma Saatleri
          </h6>
          <p className="text-slate-600 text-lg font-medium">
            Hafta İçi: 08:30 - 20:00
            <br />
            Cumartesi: 09:00 - 18:00
            <br />
            Pazar: Kapalı (Sadece Acil)
          </p>
        </div>
        <div>
          <h6 className="text-primary font-black uppercase tracking-widest mb-6 italic">
            İletişim Hattı
          </h6>
          <a
            href={`tel:${contact.phoneCall}`}
            className="text-foreground text-3xl font-black block mb-2 hover:text-primary transition-colors italic"
          >
            {contact.phone}
          </a>
          <p className="text-slate-500">{contact.email}</p>
        </div>
      </div>

      {/* Internal Linking for Footer */}
      <div className="mt-16 py-8 border-y border-slate-50 flex flex-wrap justify-center gap-x-8 gap-y-4">
        {brands.slice(0, 6).map((b) => (
          <Link
            key={b.slug}
            href={`/markalar/${b.slug}`}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
          >
            {b.name} Servisi
          </Link>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-3xl text-left">
        <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
          <span className="text-primary block mb-2 underline decoration-2 underline-offset-4">
            YASAL BİLGİLENDİRME VE FERAGATNAME:
          </span>
          Manisa Beyaz Eşya Servisi, bölgedeki tüm marka ve model beyaz eşyalar
          için hizmet veren{" "}
          <span className="text-foreground italic">
            TAMAMEN ÖZEL BİR TEKNİK SERVİS
          </span>{" "}
          kuruluşudur. Firmamızın herhangi bir markanın{" "}
          <span className="text-foreground underline decoration-red-500">
            YETKİLİ SERVİSİ İLE BİR BAĞLANTISI VEYA ANLAŞMASI BULUNMAMAKTADIR.
          </span>{" "}
          Sadece{" "}
          <span className="text-foreground">
            GARANTİ SÜRESİ DOLMUŞ (GARANTİ DIŞI)
          </span>{" "}
          cihazlara teknik destek ve onarım hizmeti sunmaktayız. Web sitemizde
          kullanılan markalar ve logolar, ilgili hak sahiplerine ait olup,
          sadece tüketicinin bilgilendirilmesi amacıyla "özel servis" hizmeti
          verdiğimizi belirtmek için kullanılmıştır.
        </p>
      </div>

      <div className="mt-24 pt-12 border-t border-slate-100 text-center text-sm text-slate-400 font-bold uppercase tracking-[0.3em]">
        <p>
          © 2026 Manisa Teknik Servis - Evolution Ajans Tarafından
          Tasarlanmıştır
        </p>
      </div>
    </footer>
  );
}
