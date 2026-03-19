import { brands, contact, services } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, Wrench, CheckCircle2, ShieldCheck, Clock, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return { title: "Marka Bulunamadı" };

  return {
    title: `Manisa ${brand.name} Servisi | Garantili Teknik Servis & Onarım`,
    description: `${brand.details.substring(0, 160)}...`,
  };
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) notFound();

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/30">
      <div className="noise-bg" />
      
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-slate-300">Özel Teknik Servis</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            Manisa <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase">{brand.name} Servisi</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {brand.details}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: ShieldCheck, title: "Orijinal Parça", desc: `${brand.name} standartlarına uygun, uzun ömürlü yedek parçalar.` },
            { icon: Clock, title: "Hızlı Müdahale", desc: "Manisa'nın her noktasına aynı gün servis kaydı ve tamir." },
            { icon: Star, title: "1 Yıl Garanti", desc: "Tüm işçilik ve değişen parçalarda resmi servis garantisi." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-[32px] hover:border-primary/20 transition-all group">
               <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <item.icon className="text-primary size-6" />
               </div>
               <h3 className="text-white font-bold text-xl mb-3 uppercase italic">{item.title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-black text-white italic uppercase mb-8 tracking-tight">Hangi Cihazlara Bakıyoruz?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={i} href={`/hizmetler/${service.slug}`} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all flex items-center gap-4 group">
                <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Wrench className="text-primary size-5 group-hover:text-white" />
                </div>
                <span className="text-white font-bold uppercase italic tracking-wide">{brand.name} {service.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-primary/90 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/30 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-black italic uppercase text-white leading-none whitespace-nowrap">
                {brand.name}
              </div>
           </div>
           
           <div className="relative z-10">
              <h4 className="text-white font-black italic uppercase text-3xl md:text-5xl mb-6 tracking-tight leading-none">
                {brand.name} Cihazınız <br /> Emin Ellerde
              </h4>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto font-medium">
                Arızayı yerinde tespit edelim, onayınızla hemen onaralım. Manisa&apos;nın her yerine bir telefon uzağınızdayız.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-white text-black font-black py-5 px-12 rounded-2xl text-xl hover:scale-[1.05] transition-transform">
                  <Phone className="size-6" /> {contact.phone}
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-black py-5 px-12 rounded-2xl text-xl hover:scale-[1.05] transition-transform">
                  <MessageCircle className="size-6" /> WhatsApp
                </a>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        © 2026 Manisa Teknik Servis - {brand.name} Marka Uzmanlığı
      </footer>
    </div>
  );
}
