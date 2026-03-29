import { districts, contact, brands } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, MapPin, Star, Clock, ShieldCheck, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const district = districts.find((d) => d.slug === slug);
  if (!district) return { title: "Bölge Bulunamadı" };

  return {
    title: `${district.name} Beyaz Eşya Tamiri – Aynı Gün Servis | ${contact.phone}`,
    description: `${district.name}'de buzdolabı, çamaşır makinesi ve bulaşık makinesi tamiri için profesyonel teknik servis. 40 yıllık tecrübe, orijinal yedek parça ve kapıda ödeme imkanı. Hemen arayın: ${contact.phone}`,
    alternates: {
      canonical: `https://manisabeyazesyaservisi.com/bolgeler/${district.slug}`,
    }
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

  const nearbyDistricts = districts
    .filter(d => d.slug !== district.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Beyaz Eşya Tamiri",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Manisa Beyaz Eşya Servisi"
        },
        "areaServed": {
          "@type": "City",
          "name": district.name
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Teknik Servis Hizmetleri",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buzdolabı Tamiri" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Çamaşır Makinesi Tamiri" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bulaşık Makinesi Servisi" } }
          ]
        }
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
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 mb-8">
            <div className="size-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 italic">{district.name} Yerel Servis Ağı</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-foreground italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            {district.name} <br />
            <span className="text-primary text-glow text-2xl md:text-5xl tracking-tight uppercase block mt-2">Beyaz Eşya Tamiri</span>
            <span className="text-slate-400 text-xl md:text-3xl tracking-widest block mt-4 font-black">Aynı Gün Servis | {contact.phone}</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {district.details}
          </p>
        </header>

        <section className="mb-20 bg-white/50 border border-slate-100 rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-foreground italic uppercase mb-6 tracking-tight">{district.name}&apos;de Profesyonel Teknik Destek</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {district.name} sakinleri için sunduğumuz beyaz eşya teknik servis hizmetimiz, bölgedeki en hızlı ve güvenilir çözüm ortağınız olmayı hedefler. Manisa&apos;nın bu köklü mahallesinde, Arçelik, Beko, Bosch, Samsung ve daha pek çok markanın uzman tamir işlemlerini gerçekleştiriyoruz. 
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>{district.name} buzdolabı tamiri:</strong> Buzdolabınızın soğutma performansındaki düşüşler, motor (kompresör) arızaları veya gaz kaçağı gibi sorunlarda dakikalar içinde müdahale ediyoruz. Gıdalarınız bozulmadan, yerinde onarım imkanıyla cihazınızı hayata döndürüyoruz.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>{district.name} çamaşır makinesi servisi:</strong> Makineniz su boşaltmıyor mu? Ya da sıkma programında aşırı ses mi çıkarıyor? {district.name} sokaklarında gezici ekiplerimizle amortisör değişimi, pompa temizliği ve kart tamiri işlemlerini garantili yedek parça kullanarak yapıyoruz.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Teknik servisimiz, sadece bozulan cihazları tamir etmekle kalmaz, aynı zamanda cihazlarınızın ömrünü uzatacak periyodik bakımları da üstlenir. 40 yıllık Manisa Teknik güvencesiyle, şeffaf fiyatlandırma ve dürüst esnaflık ilkelerimizden ödün vermeden kapınızdayız.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black text-foreground italic uppercase mb-8 tracking-tight text-center">{district.name}&apos;de Marka Servislerimiz</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brands.map((brand, i) => (
              <Link key={i} href={`/bolgeler/${district.slug}/${brand.slug}`} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/30 transition-all flex flex-col items-center gap-3 group shadow-sm">
                <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Wrench className="size-5 text-primary group-hover:text-white" />
                </div>
                <span className="text-foreground font-black uppercase italic text-[10px] tracking-widest text-center group-hover:text-primary transition-colors">{brand.name} Servisi</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Clock, title: "30 Dakikada Kapıda", desc: `${district.name} merkezine en yakın gezici ekiplerimizle ışık hızında ulaşım.` },
            { icon: ShieldCheck, title: "1 Yıl Parça Garantisi", desc: "Takılan tüm orijinal yedek parçalar 1 yıl boyunca teknik desteğimiz altındadır." },
            { icon: Star, title: "Uzman Teknisyenler", desc: `${district.name} sakinlerine profesyonel ve sertifikalı ustalarımızla hizmet veriyoruz.` }
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

        <section className="mb-20">
           <h2 className="text-3xl font-black text-foreground italic uppercase mb-8 tracking-tight text-center">{district.name} Müşteri Yorumları</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Selin T.", comment: "Buzdolabım aniden durmuştu, 1 saat içinde gelip motorunu değiştirdiler. Çok memnun kaldım.", rating: 5 },
                { name: "Murat K.", comment: "Çamaşır makinesi kart arızasını diğer servisler yapamadı ama Manisa Teknik hemen çözdü. Teşekkürler.", rating: 5 },
                { name: "Ayşe Hanım", comment: "Güler yüzlü ve çok temiz çalıştılar. Mahallemizin en iyi servisi diyebilirim.", rating: 5 },
                { name: "Levent G.", comment: "Fiyatlar piyasaya göre çok uygun ve gerçekten işinin ehli insanlar.", rating: 5 }
              ].map((rev, i) => (
                <div key={i} className="p-6 bg-white border border-slate-50 rounded-3xl shadow-sm italic">
                  <div className="flex gap-1 mb-3 text-accent">
                    {[...Array(rev.rating)].map((_, j) => <Star key={j} className="size-3 fill-accent" />)}
                  </div>
                  <p className="text-slate-600 text-sm mb-4">“{rev.comment}”</p>
                  <div className="text-xs font-black uppercase tracking-widest text-foreground">{rev.name}</div>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 overflow-hidden relative shadow-sm mb-20">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
             <MapPin className="size-64 text-primary" />
           </div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-black text-foreground italic uppercase mb-6 tracking-tight">Hizmet Alanımız</h2>
               <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                 {district.name} ilçe merkezi, tüm mahalleleri ve çevre köyleri gezici servis rotamız dahilindedir. Hangi konumda olursanız olun, bir telefonla kapınızdayız.
               </p>
               <div className="grid grid-cols-2 gap-4">
                 {["Merkez Mahalleler", "Çevre Köyler", "Sanayi Bölgeleri", "Toplu Konutlar"].map((place, i) => (
                   <div key={i} className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
                     <div className="size-1.5 bg-primary rounded-full" />
                     {place}
                   </div>
                 ))}
               </div>
             </div>
             <div className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-2xl shadow-primary/10">
                <h4 className="text-foreground font-black italic uppercase text-2xl mb-6 tracking-tight">Hemen Arayın, <br /> Kapınıza Gelelim</h4>
                <div className="space-y-4">
                  <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-foreground text-white font-black py-5 px-8 rounded-2xl text-xl hover:bg-primary transition-all hover:scale-[1.02]">
                    <Phone className="size-6" /> {contact.phone}
                  </a>
                  <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] font-black py-5 px-8 rounded-2xl text-xl hover:bg-[#25D366] hover:text-white transition-all hover:scale-[1.02]">
                    <MessageCircle className="size-6" /> WhatsApp Mesaj
                  </a>
                </div>
             </div>
           </div>
        </section>

        <section className="pt-12 border-t border-slate-100">
           <h2 className="text-xl font-black text-foreground italic uppercase mb-8 tracking-tight opacity-50">Hizmet Verdiğimiz Diğer Mahalleler</h2>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {nearbyDistricts.map((d, i) => (
                <Link key={i} href={`/bolgeler/${d.slug}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  {d.name}
                </Link>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
