import { services, contact } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, Wrench, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: `Manisa ${service.name} | Hızlı Teknik Servis & Garantili Onarım`,
    description: `Manisa genelinde profesyonel ${service.name} hizmeti. Aynı gün yerinde tamir, orijinal yedek parça ve 1 yıl işçilik garantisi ile hizmetinizdeyiz.`,
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/30">
      <div className="noise-bg" />
      
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="relative aspect-video rounded-[40px] overflow-hidden mb-12 border border-white/10 group">
          <Image
            src={service.img}
            alt={service.name}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <h1 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tight leading-none">
              {service.name}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-black text-white italic uppercase mb-4 tracking-tight">Hizmet Detayları</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {service.details}
              </p>
              
              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic mb-4">Uzmanlık Alanımız Olan Markalar:</p>
                <div className="flex flex-wrap gap-4">
                  {["Arçelik", "Beko", "Bosch", "Samsung", "LG", "Siemens", "Profilo", "Vestel"].map((brand) => (
                    <span key={brand} className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-white/5 pb-1">
                      {brand} {service.name}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white/5 border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-black text-white italic uppercase mb-6 tracking-tight">Neden Bu Hizmeti Bizden Almalısınız?</h3>
              <ul className="space-y-4">
                {[
                  "Gezici mobil servis ile en geç 2 saat içinde müdahale.",
                  "Sadece orijinal ve garantili yedek parça kullanımı.",
                  "Eğitimli ve sertifikalı teknik personel kadrosu.",
                  "Şeffaf fiyatlandırma politikası ve kapıda ödeme seçeneği.",
                  "Yapılan tüm işlemlerin kayıt altına alınması ve takip edilmesi."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <div className="size-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="size-1.5 bg-primary rounded-full" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-primary p-8 rounded-[32px] shadow-2xl shadow-primary/20 text-center">
              <h4 className="text-white font-black italic uppercase text-xl mb-4 tracking-tight leading-tight">Hemen Servis <br /> Kaydı Oluştur</h4>
              <p className="text-white/80 text-sm mb-8 leading-relaxed">Arızanız için vakit kaybetmeyin, uzman ekibimizi hemen yönlendirelim.</p>
              <div className="space-y-3">
                <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-2 bg-white text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-transform text-lg">
                  <Phone className="size-5" /> ARA
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-black py-4 rounded-2xl hover:scale-[1.02] transition-transform text-lg">
                  <MessageCircle className="size-5" /> WHATSAPP
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[32px] p-8">
              <h5 className="text-white font-black italic uppercase text-sm mb-4 tracking-widest text-primary">Çalışma Saatleri</h5>
              <div className="text-slate-400 text-sm space-y-2 font-medium">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Pazartesi - Cuma</span> <span>08:30 - 20:00</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Cumartesi</span> <span>09:00 - 18:00</span></div>
                <div className="flex justify-between pt-1 font-bold text-accent italic"><span>Pazar</span> <span>ACİL NÖBETÇİ</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        © 2026 Manisa Teknik Servis - {service.name} Bölümü
      </footer>
    </div>
  );
}
