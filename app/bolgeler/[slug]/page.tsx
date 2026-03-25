import { districts, contact, brands } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, MapPin, Star, Clock, ShieldCheck, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const district = districts.find((d) => d.slug === slug);
  if (!district) return { title: "Bölge Bulunamadı" };

  return {
    title: `${district.name} Beyaz Eşya Servisi | 40 Yıllık Tecrübe`,
    description: `${district.details.substring(0, 160)}...`,
  };
}

export async function generateStaticParams() {
  return districts.map((district) => ({
    slug: district.slug,
  }));
}

export default async function DistrictPage({ params }: Props) {
  const { slug } = await params;
  const district = districts.find((d) => d.slug === slug);

  if (!district) notFound();

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/30">
      <div className="noise-bg" />
      
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <div className="size-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">{district.name} Yerel Servis Ağı</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            {district.name}&apos;de <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase">En Yakın Servis</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {district.details}
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-black text-white italic uppercase mb-8 tracking-tight text-center">{district.name}&apos;de Marka Servislerimiz</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brands.map((brand, i) => (
              <Link key={i} href={`/bolgeler/${district.slug}/${brand.slug}`} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/30 transition-all flex flex-col items-center gap-3 group">
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Wrench className="size-5 text-primary group-hover:text-white" />
                </div>
                <span className="text-white font-bold uppercase italic text-[10px] tracking-widest text-center">{brand.name} Servisi</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Clock, title: "30 Dakikada Kapıda", desc: `${district.name} merkez ve köylerine en hızlı ulaşım garantisi.` },
            { icon: ShieldCheck, title: "Yerinde Onarım", desc: "Cihazınızı atölyeye götürmeden, gözünüzün önünde tamir ediyoruz." },
            { icon: Star, title: "Binlerce Mutlu Müşteri", desc: `${district.name} sakinlerinden tam puan alan güvenilir hizmet.` }
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

        <section className="bg-white/5 border border-white/5 rounded-[40px] p-8 md:p-12 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-12 opacity-5">
             <MapPin className="size-64 text-primary" />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase mb-6 tracking-tight">Hizmet Alanımız</h2>
               <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                 {district.name} ilçe merkezi, tüm mahalleleri ve çevre köyleri gezici servis rotamız dahilindedir. Hangi konumda olursanız olun, bir telefonla kapınızdayız.
               </p>
               <div className="grid grid-cols-2 gap-4">
                 {["Merkez Mahalleler", "Çevre Köyler", "Sanayi Bölgeleri", "Toplu Konutlar"].map((place, i) => (
                   <div key={i} className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
                     <div className="size-1.5 bg-primary rounded-full" />
                     {place}
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="bg-primary/90 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl shadow-primary/30">
                <h4 className="text-white font-black italic uppercase text-2xl mb-6 tracking-tight">Hemen Arayın, <br /> Kapınıza Gelelim</h4>
                <div className="space-y-4">
                  <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-white text-black font-black py-5 px-8 rounded-2xl text-xl hover:scale-[1.02] transition-transform">
                    <Phone className="size-6" /> {contact.phone}
                  </a>
                  <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-black py-5 px-8 rounded-2xl text-xl hover:scale-[1.02] transition-transform">
                    <MessageCircle className="size-6" /> WhatsApp Mesaj
                  </a>
                </div>
             </div>
           </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        © 2026 Manisa Teknik Servis - {district.name} Yerel Ekibi
      </footer>
    </div>
  );
}
