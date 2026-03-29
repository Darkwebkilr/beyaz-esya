import { brands, contact, services } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, Wrench, ShieldCheck, Clock, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return { title: "Marka Bulunamadı" };

  return {
    title: `Manisa ${brand.name} Servisi – Aynı Gün Yerinde Tamir | ${contact.phone}`,
    description: `Manisa genelinde ${brand.name} marka beyaz eşyalarınız için profesyonel teknik servis. Orijinal yedek parça, 1 yıl garanti ve hızlı onarım çözümleri. Hemen arayın: ${contact.phone}`,
    alternates: {
      canonical: `https://manisabeyazesyaservisi.com/markalar/${brand.slug}`,
    }
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

  const otherBrands = brands.filter(b => b.slug !== brand.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": `${brand.name} Beyaz Eşya Tamiri`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Manisa Beyaz Eşya Servisi"
        },
        "areaServed": {
          "@type": "City",
          "name": "Manisa"
        },
        "description": `${brand.name} marka tüm beyaz eşyalar için orijinal parça destekli teknik servis hizmeti.`
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
            <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 italic">Teknik Servis Uzmanlığı</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-foreground italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            Manisa <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase block mt-2">{brand.name} Servisi</span>
            <span className="text-slate-400 text-xl md:text-3xl tracking-widest block mt-4 font-black">Profesyonel Onarım | {contact.phone}</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium italic">
            {brand.details}
          </p>
        </header>

        <section className="mb-20 bg-white/50 border border-slate-100 rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
           <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-black text-foreground italic uppercase mb-6 tracking-tight">{brand.name} Marka Cihazlarda Uzman Çözümler</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {brand.name} markasının teknolojik üstünlüğüne ve karmaşık yapısına hakim olan ekibimizle, Manisa genelinde en kapsamlı teknik servis desteğini sunuyoruz. Buzdolabından bulaşık makinesine, çamaşır makinesinden fırına kadar tüm {brand.name} modellerinde orijinal yedek parça garantisi veriyoruz.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                 <div className="p-6 bg-white rounded-3xl border border-slate-50 shadow-sm">
                    <h3 className="text-lg font-black text-foreground uppercase italic mb-3">Teknolojik Onarım</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                       {brand.name} cihazların elektronik kart tamiri, inverter motor değişimleri ve sensör kalibrasyonları gibi hassas işlemleri özel ekipmanlarımızla yerinde gerçekleştiriyoruz.
                    </p>
                 </div>
                 <div className="p-6 bg-white rounded-3xl border border-slate-50 shadow-sm">
                    <h3 className="text-lg font-black text-foreground uppercase italic mb-3">Orijinal Yedek Parça</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                       Cihazınızın ömrünü korumak için sadece {brand.name} standartlarına uygun, fabrikasyon onaylı parçalar kullanıyor ve takılan her parçaya 1 yıl resmi servis garantisi sağlıyoruz.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: ShieldCheck, title: "1 Yıl Garanti", desc: `${brand.name} cihazınıza takılan tüm parçalarda resmi teknik destek garantisi.` },
            { icon: Clock, title: "Aynı Gün Servis", desc: "Manisa'nın her noktasına aynı gün içerisinde hızlı ve kesin çözüm." },
            { icon: Star, title: "Sertifikalı Kadro", desc: `${brand.name} teknolojileri konusunda eğitimli ve deneyimli teknik ekip.` }
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
          <h2 className="text-3xl font-black text-foreground italic uppercase mb-8 tracking-tight text-center">Hizmet Verdiğimiz {brand.name} Cihazlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={i} href={`/hizmetler/${service.slug}`} className="p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-primary/30 transition-all flex items-center gap-4 group shadow-sm">
                <div className="size-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Wrench className="text-primary size-5 group-hover:text-white" />
                </div>
                <span className="text-foreground font-bold uppercase italic tracking-wide group-hover:text-primary transition-colors">{brand.name} {service.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-20">
           <h2 className="text-3xl font-black text-foreground italic uppercase mb-8 tracking-tight text-center">Müşteri Deneyimleri</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Hakan Y.", comment: `${brand.name} buzdolabım soğutmuyordu, aynı gün içinde gelip sorunu çözdüler. Çok profesyoneller.`, rating: 5 },
                { name: "Sema Nur", comment: "Bulaşık makinesi için çağırmıştım, hem çok hızlı geldiler hem de fiyatları çok uygundu.", rating: 5 }
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

        <section className="bg-white border border-slate-100 p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/10 text-center relative overflow-hidden mb-20">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-black italic uppercase text-foreground leading-none whitespace-nowrap">
                {brand.name}
              </div>
           </div>
           <div className="relative z-10">
              <h4 className="text-foreground font-black italic uppercase text-3xl md:text-5xl mb-6 tracking-tight leading-none">
                {brand.name} Cihazınız <br /> Emin Ellerde
              </h4>
              <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto font-medium">
                Arızayı yerinde tespit edelim, onayınızla hemen onaralım. Manisa&apos;nın her yerine bir telefon uzağınızdayız.
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

        <section className="pt-12 border-t border-slate-100">
           <h2 className="text-xl font-black text-foreground italic uppercase mb-8 tracking-tight opacity-50 text-center">Diğer Uzmanlık Alanlarımız</h2>
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {otherBrands.map((b, i) => (
                <Link key={i} href={`/markalar/${b.slug}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
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
