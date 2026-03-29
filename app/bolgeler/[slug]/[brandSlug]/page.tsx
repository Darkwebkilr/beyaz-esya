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
    description: `${district.name} bölgesinde profesyonel ${brand.name} beyaz eşya tamiri. Aynı gün yerinde servis, orijinal yedek parça desteği ve hızlı onarım.`,
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
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/20">
      <div className="noise-bg" style={{ opacity: 0.02 }} />
      
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 mb-8">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 italic">{district.name} Yerel Ekibi</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-foreground italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            {district.name} <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase">{brand.name} Servisi</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {district.name} sakinleri için 40 yılı aşkın tecrübemizle profesyonel {brand.name} beyaz eşya onarım and bakım hizmeti sunuyoruz.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: ShieldCheck, title: "40 Yıllık Güven", desc: `${brand.name} cihazlarınızda on yılların getirdiği tecrübe ve uzmanlık.` },
            { icon: Clock, title: "30 Dakikada Kapıda", desc: `${district.name} genelinde en hızlı servis desteği.` },
            { icon: Star, title: "Orijinal Parça", desc: "Tüm onarımlarda sadece orijinal yedek parça desteği ve uzman işçilik." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] hover:border-primary/20 transition-all group shadow-sm">
               <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <item.icon className="text-primary size-6" />
               </div>
               <h3 className="text-foreground font-black text-xl mb-3 uppercase italic">{item.title}</h3>
               <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-[40px] overflow-hidden border-2 border-slate-100 shadow-xl">
             <Image 
                src="/beyaz-esya-tamiri.jpg"
                alt={`${district.name} ${brand.name} Servisi`}
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="space-y-6">
             <h2 className="text-3xl font-black text-foreground italic uppercase tracking-tight">{district.name}&apos;de {brand.name} Uzmanlığı</h2>
             <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {brand.name} marka cihazlarınızın teknolojisine hakimiz. {district.name} ve çevresinde gezici servis araçlarımızla buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve kombi arızalarına yerinde çözüm üretiyoruz.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {services.map((service, i) => (
                 <Link key={i} href={`/hizmetler/${service.slug}`} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group shadow-sm">
                    <Wrench className="size-5 text-primary group-hover:rotate-45 transition-transform" />
                    <span className="text-foreground font-bold uppercase italic text-sm group-hover:text-primary transition-colors">{brand.name} {service.name}</span>
                 </Link>
               ))}
             </div>
          </div>
        </section>

        <section className="bg-white border border-slate-100 p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/10 text-center relative overflow-hidden">
           <div className="relative z-10">
              <h4 className="text-foreground font-black italic uppercase text-3xl md:text-5xl mb-6 tracking-tight leading-none">
                {district.name} Teknik Destek Hattı
              </h4>
              <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto font-medium">
                {brand.name} cihazınızdaki arıza için vakit kaybetmeyin. Hemen arayın, kapınıza gelelim.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-foreground text-white font-black py-5 px-12 rounded-2xl text-xl hover:bg-primary transition-all hover:scale-[1.05]">
                  <Phone className="size-6" /> {contact.phone}
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] font-black py-5 px-12 rounded-2xl text-xl hover:bg-[#25D366] hover:text-white transition-all hover:scale-[1.05]">
                  <MessageCircle className="size-6" /> WhatsApp
                </a>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-slate-100 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        © 2026 Manisa Teknik Servis - {district.name} {brand.name} Bölümü
      </footer>
    </div>
  );
}
