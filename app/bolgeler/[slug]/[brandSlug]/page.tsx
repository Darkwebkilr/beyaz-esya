import { districts, brands, contact, services } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, ShieldCheck, Clock, Star, Wrench } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string; brandSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, brandSlug } = await params;
  const district = districts.find((d) => d.slug === slug);
  const brand = brands.find((b) => b.slug === brandSlug);
  
  if (!district || !brand) return { title: "Sayfa Bulunamadı" };

  return {
    title: `Manisa ${district.name} ${brand.name} Servisi | 40 Yıllık Tecrübe`,
    description: `${district.name} bölgesinde profesyonel ${brand.name} beyaz eşya tamiri. Aynı gün yerinde servis, orijinal yedek parça ve 1 yıl garanti.`,
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const district of districts) {
    for (const brand of brands) {
      params.push({
        slug: district.slug,
        brandSlug: brand.slug,
      });
    }
  }
  return params;
}

export default async function BrandInDistrictPage({ params }: Props) {
  const { slug, brandSlug } = await params;
  const district = districts.find((d) => d.slug === slug);
  const brand = brands.find((b) => b.slug === brandSlug);

  if (!district || !brand) notFound();

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/30">
      <div className="noise-bg" />
      
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase text-slate-300">{district.name} Yerel Ekibi</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            {district.name} <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase">{brand.name} Servisi</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {district.name} sakinleri için 40 yılı aşkın tecrübemizle profesyonel {brand.name} beyaz eşya onarım and bakım hizmeti sunuyoruz.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: ShieldCheck, title: "40 Yıllık Güven", desc: `${brand.name} cihazlarınızda on yılların getirdiği tecrübe ve uzmanlık.` },
            { icon: Clock, title: "30 Dakikada Kapıda", desc: `${district.name} genelinde en hızlı servis garantisi.` },
            { icon: Star, title: "Orijinal Parça", desc: "Tüm onarımlarda sadece orijinal yedek parça ve 1 yıl garanti." }
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

        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-[40px] overflow-hidden border-2 border-white/10">
             <Image 
                src="/beyaz-esya-tamiri.jpg"
                alt={`${district.name} ${brand.name} Servisi`}
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="space-y-6">
             <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">{district.name}&apos;de {brand.name} Uzmanlığı</h2>
             <p className="text-slate-400 text-lg leading-relaxed">
                {brand.name} marka cihazlarınızın teknolojisine hakimiz. {district.name} ve çevresinde gezici servis araçlarımızla buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve kombi arızalarına yerinde çözüm üretiyoruz.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {services.map((service, i) => (
                 <Link key={i} href={`/hizmetler/${service.slug}`} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                    <Wrench className="size-5 text-primary group-hover:rotate-45 transition-transform" />
                    <span className="text-white font-bold uppercase italic text-sm">{brand.name} {service.name}</span>
                 </Link>
               ))}
             </div>
          </div>
        </section>

        <section className="bg-primary/90 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/30 text-center relative overflow-hidden">
           <div className="relative z-10">
              <h4 className="text-white font-black italic uppercase text-3xl md:text-5xl mb-6 tracking-tight leading-none">
                {district.name} Teknik Destek Hattı
              </h4>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto font-medium">
                {brand.name} cihazınızdaki arıza için vakit kaybetmeyin. Hemen arayın, kapınıza gelelim.
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
        © 2026 Manisa Teknik Servis - {district.name} {brand.name} Bölümü
      </footer>
    </div>
  );
}
