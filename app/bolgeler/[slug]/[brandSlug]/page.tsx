import { districts, brands, contact, services } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Star,
  Wrench,
  MapPin,
} from "lucide-react";
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
      canonical: `https://manisamerkezservisi.com/bolgeler/${district.slug}/${brand.slug}`,
    },
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

  const otherBrands = brands.filter((b) => b.slug !== brand.slug).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: `${brand.name} Teknik Servisi`,
        provider: {
          "@type": "LocalBusiness",
          name: "Manisa Beyaz Eşya Servisi",
        },
        areaServed: {
          "@type": "City",
          name: district.name,
        },
        description: `${district.name} mahallesinde ${brand.name} marka beyaz eşyalar için profesyonel onarım hizmeti.`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/20">
      <div className="noise-bg" style={{ opacity: 0.02 }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        {/* Hero Section - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <header className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <div className="size-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-black tracking-[0.2em] uppercase text-black italic">
                {district.name} Yerel Ekibi
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-foreground italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
              {district.name} <br />
              <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase block mt-2">
                {brand.name} Servisi
              </span>
              <span className="text-black text-lg md:text-2xl tracking-widest block mt-6 font-black uppercase italic">
                Aynı Gün Onarım | {contact.phone}
              </span>
            </h1>
            <p className="text-black text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium italic mb-10">
              {district.name} sakinleri için 40 yılı aşkın tecrübemizle
              profesyonel {brand.name} beyaz eşya onarım ve periyodik bakım
              hizmeti sunuyoruz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href={`tel:${contact.phoneCall}`}
                className="bg-foreground text-white px-8 py-4 rounded-2xl font-black italic uppercase text-sm hover:bg-primary transition-all shadow-lg shadow-primary/10"
              >
                Hemen Ara
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                className="bg-white border border-slate-100 text-[#25D366] px-8 py-4 rounded-2xl font-black italic uppercase text-sm hover:border-[#25D366]/20 transition-all shadow-sm"
              >
                WhatsApp Destek
              </a>
            </div>
          </header>

          <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-slate-100 group shadow-2xl order-1 lg:order-2">
            <Image
              src="/beyaz-esya-servisi-manisa.webp"
              alt={`${district.name} ${brand.name} Teknik Servis`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
          </div>
        </div>

        <section className="mb-20 bg-white/50 border border-slate-50 rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
          <div className="prose prose-slate max-w-none">
            <div className="grid lg:grid-cols-3 gap-12 items-center mb-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-black text-foreground italic uppercase mb-6 tracking-tight">
                  {district.name}&apos;de Yetkin {brand.name} Hizmeti
                </h2>
                <p className="text-black leading-relaxed mb-6 font-medium italic">
                  {district.name} bölgesinde {brand.name} marka cihazlarınızda
                  meydana gelen her türlü teknik soruna, donanımlı gezici
                  araçlarımızla anında müdahale ediyoruz. Buzdolabı motor
                  değişiminden çamaşır makinesi kart tamirine kadar tüm
                  işlemlerde {brand.name} orijinal yedek parçalarını kullanarak
                  cihazınızı ilk günkü performansına kavuşturuyoruz.
                </p>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg">
                <Image
                  src="/beyaz-esya-tamiri.jpg"
                  alt={`${district.name} ${brand.name} Onarım`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-black text-foreground uppercase italic border-l-4 border-primary pl-4">
                  Hızlı Randevu
                </h3>
                <p className="text-black/70 text-sm italic font-bold">
                  {district.name} için oluşturulan servis kayıtlarına aynı gün
                  içerisinde yanıt veriyor, zamanınızı boşa harcamıyoruz.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-black text-foreground uppercase italic border-l-4 border-accent pl-4">
                  Garantili İşçilik
                </h3>
                <p className="text-black/70 text-sm italic font-bold">
                  Yapılan tüm {brand.name} onarımları ve değişen yedek parçalar
                  için 1 yıl boyunca teknik destek güvencesi veriyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: ShieldCheck,
              title: "Uzman Kadro",
              desc: `${brand.name} teknolojileri konusunda eğitimli ve sertifikalı ustalar.`,
            },
            {
              icon: Clock,
              title: "30 Dakikada Kapıda",
              desc: `${district.name} genelinde en hızlı mobil servis ağı.`,
            },
            {
              icon: Star,
              title: "Orijinal Yedek Parça",
              desc: "Taklit parçalardan kaçınan, sadece fabrikasyon onaylı ürün desteği.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-slate-100 rounded-[32px] hover:border-primary/20 transition-all group shadow-sm"
            >
              <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="text-primary size-6" />
              </div>
              <h3 className="text-foreground font-black text-xl mb-3 uppercase italic">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-slate-100 pt-20">
          <div className="relative aspect-square rounded-[40px] overflow-hidden border-2 border-slate-100 shadow-xl group">
            <Image
              src="/camasir-makinesi-servisi.webp"
              alt={`${district.name} ${brand.name} Servisi`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-foreground italic uppercase tracking-tight">
              {brand.name} Cihazlarınıza Özel Çözümler
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
              {district.name} sakinleri olarak cihazınızdaki arızayı dert
              etmeyin. Profesyonel ekibimizle tüm {brand.name} modellerine
              hakimiz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <Link
                  key={i}
                  href={`/hizmetler/${service.slug}`}
                  className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 transition-all group shadow-sm"
                >
                  <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Wrench className="size-4 text-primary group-hover:text-white" />
                  </div>
                  <span className="text-foreground font-bold uppercase italic text-[10px] tracking-widest group-hover:text-primary transition-colors">
                    {brand.name} {service.name}
                  </span>
                </Link>
              ))}
            </div>
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
              Hemen Arayın, <br /> Kapınıza Gelelim
            </h4>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto font-medium italic">
              {district.name} {brand.name} servisi için bir telefon
              uzağınızdayız. Orijinal parça ve yerinde onarım garantisi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${contact.phoneCall}`}
                className="flex items-center justify-center gap-3 bg-foreground text-white font-black py-5 px-12 rounded-2xl text-xl hover:bg-primary transition-all shadow-xl shadow-primary/10"
              >
                <Phone className="size-6" /> {contact.phone}
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                className="flex items-center justify-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] font-black py-5 px-12 rounded-2xl text-xl hover:bg-[#25D366] hover:text-white transition-all"
              >
                <MessageCircle className="size-6" /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="pt-12 border-t border-slate-100">
          <h2 className="text-xl font-black text-foreground italic uppercase mb-8 tracking-tight opacity-50 text-center">
            {district.name}&apos;de Diğer Markalar
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {otherBrands.map((b, i) => (
              <Link
                key={i}
                href={`/bolgeler/${district.slug}/${b.slug}`}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
              >
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
