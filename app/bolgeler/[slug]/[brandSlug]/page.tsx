import { districts, brands, contact, services } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, ShieldCheck, Clock, Star, Wrench, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    title: `${district.name} ${brand.name} Servisi – Aynı Gün Yerinde Tamir | ${contact.phone}`,
    description: `${district.name} bölgesinde profesyonel ${brand.name} beyaz eşya tamiri. Orijinal yedek parça, 1 yıl garanti ve hızlı servis desteği. Hemen arayın: ${contact.phone}`,
    alternates: {
      canonical: `https://manisabeyazesyaservisi.com/bolgeler/${district.slug}/${brand.slug}`,
    }
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

  const otherBrands = brands.filter(b => b.slug !== brand.slug).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": `${brand.name} Teknik Servisi`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Manisa Beyaz Eşya Servisi"
        },
        "areaServed": {
          "@type": "City",
          "name": district.name
        },
        "description": `${district.name} mahallesinde ${brand.name} marka beyaz eşyalar için profesyonel onarım hizmeti.`
      }
    ]
  };

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/20">
      <div className="noise-bg" style={{ opacity: 0.02 }} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 italic">{district.name} Yerel Ekibi</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-foreground italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            {district.name} <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase block mt-2">{brand.name} Servisi</span>
            <span className="text-slate-400 text-xl md:text-3xl tracking-widest block mt-4 font-black italic">Aynı Gün Onarım | {contact.phone}</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {district.name} sakinleri için 40 yılı aşkın tecrübemizle profesyonel {brand.name} beyaz eşya onarım ve periyodik bakım hizmeti sunuyoruz.
          </p>
        </header>

        <section className="mb-20 bg-white/50 border border-slate-50 rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
           <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-black text-foreground italic uppercase mb-6 tracking-tight">{district.name}&apos;de Yetkin {brand.name} Hizmeti</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {district.name} bölgesinde {brand.name} marka cihazlarınızda meydana gelen her türlü teknik soruna, donanımlı gezici araçlarımızla anında müdahale ediyoruz. Buzdolabı motor değişiminden çamaşır makinesi kart tamirine kadar tüm işlemlerde {brand.name} orijinal yedek parçalarını kullanarak cihazınızı ilk günkü performansına kavuşturuyoruz.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="text-lg font-black text-foreground uppercase italic border-l-4 border-primary pl-4">Hızlı Randevu</h3>
                    <p className="text-slate-500 text-sm italic">
                      {district.name} için oluşturulan servis kayıtlarına aynı gün içerisinde yanıt veriyor, zamanınızı boşa harcamıyoruz.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-black text-foreground uppercase italic border-l-4 border-accent pl-4">Garantili İşçilik</h3>
                    <p className="text-slate-500 text-sm italic">
                      Yapılan tüm {brand.name} onarımları ve değişen yedek parçalar için 1 yıl boyunca teknik destek güvencesi veriyoruz.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: ShieldCheck, title: "Uzman Kadro", desc: `${brand.name} teknolojileri konusunda eğitimli ve sertifikalı ustalar.` },
            { icon: Clock, title: "30 Dakikada Kapıda", desc: `${district.name} genelinde en hızlı mobil servis ağı.` },
            { icon: Star, title: "Orijinal Yedek Parça", desc: "Taklit parçalardan kaçınan, sadece fabrikasyon onaylı ürün desteği." }
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
          <div className="relative aspect-square rounded-[40px] overflow-hidden border-2 border-slate-100 shadow-xl group">
             <Image 
                src="/beyaz-esya-tamiri.jpg"
                alt={`${district.name} ${brand.name} Servisi`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
             <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 shadow-lg">
                   <MapPin className="size-3" /> {district.name}
                </div>
                <div className="text-white text-2xl font-black italic uppercase tracking-tighter shadow-sm">{brand.name} Servis Noktası</div>
             </div>
          </div>
          <div className="space-y-6">
             <h2 className="text-3xl font-black text-foreground italic uppercase tracking-tight">{brand.name} Cihazlarınıza Özel Çözümler</h2>
             <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
                {district.name} sakinleri olarak cihazınızdaki arızayı dert etmeyin. Profesyonel ekibimizle tüm {brand.name} modellerine hakimiz.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {services.map((service, i) => (
                 <Link key={i} href={`/hizmetler/${service.slug}`} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 transition-all group shadow-sm">
                    <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                       <Wrench className="size-4 text-primary group-hover:text-white" />
                    </div>
                    <span className="text-foreground font-bold uppercase italic text-[10px] tracking-widest group-hover:text-primary transition-colors">{brand.name} {service.name}</span>
                 </Link>
               ))}
             </div>
          </div>
        </section>

        <section className="bg-white border border-slate-100 p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/10 text-center relative overflow-hidden mb-20">
           <div className="relative z-10">
              <h4 className="text-foreground font-black italic uppercase text-3xl md:text-5xl mb-6 tracking-tight leading-none">
                Hemen Arayın, <br /> Kapınıza Gelelim
              </h4>
              <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto font-medium italic">
                {district.name} {brand.name} servisi için bir telefon uzağınızdayız. Orijinal parça ve yerinde onarım garantisi.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-foreground text-white font-black py-5 px-12 rounded-2xl text-xl hover:bg-primary transition-all shadow-xl shadow-primary/20">
                  <Phone className="size-6" /> {contact.phone}
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] font-black py-5 px-12 rounded-2xl text-xl hover:bg-[#25D366] hover:text-white transition-all">
                  <MessageCircle className="size-6" /> WhatsApp
                </a>
              </div>
           </div>
        </section>

        {/* Tactical Section: Internal Linking (Other Brands) */}
        <section className="pt-12 border-t border-slate-100">
           <h2 className="text-xl font-black text-foreground italic uppercase mb-8 tracking-tight opacity-50 text-center">{district.name}&apos;de Diğer Markalar</h2>
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {otherBrands.map((b, i) => (
                <Link key={i} href={`/bolgeler/${district.slug}/${b.slug}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  {b.name} Servisi
                </Link>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
