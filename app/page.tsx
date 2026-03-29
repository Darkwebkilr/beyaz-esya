import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Wrench, ShieldCheck, Clock, CheckCircle2, Star, MapPin } from "lucide-react";
import { services, districts, brands, contact } from "@/app/constants";
import Navbar from "@/components/Navbar";
import TestimonialSlider from "@/components/TestimonialSlider";

export default function Home() {
  const faqs = [
    { q: "Buzdolabı neden soğutmaz?", a: "Buzdolabının soğutmamasının en yaygın nedenleri gaz kaçağı, kompresör arızası veya fan motoru problemleridir. Manisa servisimizle aynı gün yerinde arıza tespiti yapıyoruz." },
    { q: "Çamaşır makinesi neden çok ses çıkarır?", a: "Aşırı ses genellikle amortisörlerin aşınması, kazan rulmanlarının bozulması veya yabancı cisim kaçmasından kaynaklanır. Arçelik, Beko ve Bosch marka cihazlarınızda orijinal parça ile değişim sağlıyoruz." },
    { q: "Orijinal yedek parça kullanıyor musunuz?", a: "Evet, Manisa Beyaz Eşya Servisi olarak tüm onarımlarda cihazınızın marka ve modeline uygun, yüksek kaliteli ve orijinal yedek parçalar kullanıyoruz." },
    { q: "Aynı gün servis hizmetiniz var mı?", a: "Evet, Manisa merkez (Yunusemre, Şehzadeler) ve çevre ilçelere (Turgutlu, Salihli vb.) gezici ekiplerimizle aynı gün içerisinde müdahale ediyoruz." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Manisa Beyaz Eşya Servisi",
        "image": "https://manisabeyazesyaservisi.com/beyaz-esya-tamiri.jpg",
        "@id": "https://manisabeyazesyaservisi.com/#organization",
        "url": "https://manisabeyazesyaservisi.com",
        "telephone": contact.phoneCall,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Merkez Mahalle No:1",
          "addressLocality": "Manisa",
          "postalCode": "45000",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 38.614,
          "longitude": 27.429
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:30",
          "closes": "20:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "124"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Ahmet Y." },
            "datePublished": "2026-03-10",
            "reviewBody": "Buzdolabım soğutmuyordu, aradıktan 40 dakika sonra geldiler. Motor arızasını hemen tespit edip yerinde çözdüler.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Melis K." },
            "datePublished": "2026-02-15",
            "reviewBody": "Çamaşır makinesi kart arızasını aynı gün gelip tamir ettiler. Hem çok uygun fiyatlı hem de profesyonel hizmet.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" }
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Beyaz Eşya Tamiri",
        "provider": { "@id": "https://manisabeyazesyaservisi.com/#organization" },
        "areaServed": { "@type": "City", "name": "Manisa" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Tamir Hizmetleri",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buzdolabı Tamiri" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Çamaşır Makinesi Tamiri" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bulaşık Makinesi Tamiri" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Klima Servisi" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kombi Bakımı" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="relative min-h-screen mesh-gradient selection:bg-primary/20">
      <div className="noise-bg" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <div className="size-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 italic">Manisa&apos;nın 40 Yıllık Teknik Gücü</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground uppercase italic">
              Beyaz Eşyada <br />
              <span className="text-primary text-glow">Kesin Çözüm</span> <br />
              <span className="text-4xl md:text-6xl text-slate-400">Profesyonel Onarım</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
              Manisa genelinde 40 yılı aşkın tecrübemizle, tüm marka ve model beyaz eşyalarınızı yerinde ve orijinal parça desteği ile hayata döndürüyoruz. Aynı gün kapınızdayız.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-foreground text-white font-black py-5 px-10 rounded-2xl text-lg hover:bg-primary transition-all hover:scale-[1.05] active:scale-95 shadow-2xl group">
                <Phone className="size-6 group-hover:animate-bounce" />
                {contact.phone}
              </a>
              <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] font-black py-5 px-10 rounded-2xl text-lg hover:bg-[#25D366] hover:text-white transition-all hover:scale-[1.05] active:scale-95">
                <MessageCircle className="size-6" />
                WhatsApp Destek
              </a>
            </div>

            {/* Quick Info Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-100">
              {[
                { label: "Deneyim", value: "40+ Yıl" },
                { label: "Müşteri", value: "10k+" },
                { label: "Uzman", value: "Teknik" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl font-black text-foreground italic">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:block hidden">
            {/* Background solid offset block */}
            <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-[40px] -z-10 opacity-10" />
            
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border-2 border-slate-100 shadow-2xl transition-all duration-500 hover:-translate-x-2 hover:-translate-y-2">
              <Image
                src="/beyaz-esya-tamiri.jpg"
                alt="Manisa Beyaz Eşya Tamiri"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Minimalist Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-primary font-black italic uppercase text-xs tracking-[0.3em] mb-2">Güvenilir Servis</div>
                    <div className="text-white font-black italic uppercase text-2xl tracking-tight leading-none">Manisa Teknik</div>
                  </div>
                  <div className="size-12 border-2 border-primary rounded-full flex items-center justify-center">
                    <Wrench className="text-primary size-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Detail Elements */}
            <div className="absolute -top-6 -right-6 p-4 bg-accent rounded-2xl shadow-xl -rotate-6 hover:rotate-0 transition-transform duration-500">
               <Star className="text-white size-6 fill-white" />
            </div>
          </div>
        </div>
      </main>

      {/* Brands Static Grid */}
      <section id="markalar" className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-2 italic">Uzmanlık Alanımız</h2>
            <h3 className="text-3xl font-black text-foreground italic tracking-tight uppercase">Tamirini Yaptığımız Markalar</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {brands.map((brand, idx) => (
              <Link key={idx} href={`/markalar/${brand.slug}`} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-center group hover:border-primary/30 transition-all duration-300 shadow-sm">
                <span className="text-sm font-black text-slate-500 uppercase italic tracking-widest group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="hakkimizda" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-primary italic">Biz Kimiz?</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-foreground italic uppercase tracking-tighter leading-none">
                  Manisa&apos;nın <br />
                  <span className="text-primary">Güven Mirası</span>
                </h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                   <p>
                     40 yılı aşkın bir süre önce Manisa merkezinde küçük bir atölye olarak başladığımız bu yolculukta, bugün tüm ilçelere yayılan dev bir teknik servis ağına dönüştük. Amacımız sadece bozulan cihazları tamir etmek değil, Manisalı hemşerilerimizin günlük konforunu kesintisiz sürdürmelerini sağlamaktır.
                   </p>
                   <p>
                     Yunusemre&apos;den Köprübaşı&apos;na kadar Manisa&apos;nın her karışını avucumuzun içi gibi biliyoruz. Arçelik, Beko, Bosch gibi dünya devlerinin teknolojilerini yakından takip ediyor, her yıl düzenli eğitim alan sertifikalı teknisyenlerimizle &quot;imkansız&quot; denilen arızaları bile yerinde çözüyoruz.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                   <div>
                      <div className="text-foreground font-black italic text-xl uppercase mb-1">Dürüst Hizmet</div>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Sürpriz Fiyat Yok</p>
                   </div>
                   <div>
                      <div className="text-foreground font-black italic text-xl uppercase mb-1">Yerel Güç</div>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Manisa&apos;nın Öz Sermayesi</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="relative order-1 lg:order-2">
             <div className="relative aspect-square rounded-[60px] overflow-hidden border-2 border-slate-100 shadow-2xl">
                <Image 
                  src="/bulasık-makinesi-servisi.jpg" 
                  alt="Hakkımızda - Manisa Beyaz Eşya Servisi"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                
                <div className="absolute top-10 right-10 size-32 bg-white flex flex-col items-center justify-center rounded-full shadow-2xl rotate-12 transition-transform">
                   <span className="text-4xl font-black text-black leading-none">40</span>
                   <span className="text-[10px] font-black text-black uppercase tracking-widest text-center">Yıllık<br/>Tecrübe</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-4 italic">Neler Yapıyoruz?</h2>
          <h3 className="text-4xl md:text-6xl font-black text-foreground italic tracking-tight uppercase">Hızlı ve <br /> Yerinde Servis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link key={idx} href={`/hizmetler/${service.slug}`} className="group relative bg-white border border-slate-100 rounded-[32px] overflow-hidden hover:border-primary/20 transition-all duration-500 flex flex-col shadow-sm">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>
              <div className="p-8 relative flex-1 flex flex-col">
                <div className="size-12 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Wrench className="text-white size-6" />
                </div>
                <h4 className="text-2xl font-black text-foreground italic uppercase mb-4 tracking-tight">{service.name}</h4>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm font-medium">
                  {service.details.length > 120 ? service.details.substring(0, 150) + "..." : service.details}
                </p>
                <div className="mt-auto">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 italic">
                    HİZMET DETAYLARI <div className="size-1 bg-primary rounded-full" /> →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section id="neden-biz" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-4 italic">Farkımız</h2>
            <h3 className="text-4xl md:text-6xl font-black text-foreground italic tracking-tight uppercase mb-8 leading-tight">Neden Bizi <br /> Tercih Etmelisiniz?</h3>
            <p className="text-slate-600 text-lg mb-10">
              Manisa&apos;nın tüm ilçelerine yayılmış geniş mobil ağımızla, beyaz eşya arızalarınıza dakikalar içerisinde çözüm buluyoruz.
            </p>
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Tüm Markalar, Tek Servis", desc: "Arçelik, Bosch, Samsung ve tüm markaların onarımını yapıyoruz." },
                { icon: Clock, title: "Dakik Randevu Sistemi", desc: "Zamanınız değerli. Belirttiğimiz saatte kapınızdayız." },
                { icon: CheckCircle2, title: "Orijinal Yedek Parça", desc: "Taklit parçalardan kaçınır, cihazınızın sağlığını önemsiyoruz." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary size-6" />
                  </div>
                  <div>
                    <h5 className="text-foreground font-bold text-lg mb-1">{item.title}</h5>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[450px] lg:h-[600px] rounded-[40px] overflow-hidden border border-slate-100 flex items-center justify-center bg-white">
             
             <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Districts Grid Section */}
      <section id="ilceler" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="mb-16 text-center">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-4 italic">Hizmet Bölgelerimiz</h2>
          <h3 className="text-4xl md:text-6xl font-black text-foreground italic tracking-tight uppercase">Öne Çıkan <br /> Bölgelerimiz</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {districts
            .filter(d => [
              "75-yil-mahallesi",
              "akpinar-mahallesi",
              "alaybey-mahallesi",
              "anafartalar-mahallesi",
              "guzelyurt-mahallesi",
              "karakoy-mahallesi",
              "laleli-mahallesi",
              "muradiye-mahallesi",
              "sehzadeler-mahallesi",
              "tevfikiye-mahallesi",
              "uncubozkoy-mahallesi",
              "yunus-emre-mahallesi"
            ].includes(d.slug) || [
              "75. Yıl Mahallesi",
              "Akpınar Mahallesi",
              "Alaybey Mahallesi",
              "Anafartalar Mahallesi",
              "Güzelyurt Mahallesi",
              "Karaköy Mahallesi",
              "Laleli Mahallesi",
              "Muradiye Mahallesi",
              "Şehzadeler Mahallesi",
              "Tevfikiye Mahallesi",
              "Uncubozköy Mahallesi",
              "Yunus Emre Mahallesi"
            ].includes(d.name))
            .map((district, idx) => (
              <Link key={idx} href={`/bolgeler/${district.slug}`} className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-white hover:border-primary/20 transition-all group shadow-sm">
                <MapPin className="size-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-slate-600 uppercase tracking-widest text-center">{district.name}</span>
              </Link>
            ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-slate-100">
        <div className="mb-16 text-center">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-4 italic">Sıkça Sorulanlar</h2>
          <h3 className="text-4xl md:text-6xl font-black text-foreground italic tracking-tight uppercase">Bilgi Merkezi</h3>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-primary/20 transition-all group">
              <h4 className="text-xl font-black text-foreground italic uppercase mb-4 tracking-tight group-hover:text-primary transition-colors flex items-center gap-3">
                <div className="size-2 bg-primary rounded-full" />
                {faq.q}
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium pl-5 border-l border-slate-100">
                {faq.a}
              </p>
              </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="iletisim" className="py-24 px-6 max-w-7xl mx-auto text-center border-t border-slate-100">
        <h2 className="text-5xl md:text-9xl font-black text-slate-100 uppercase italic mb-8 tracking-tighter">Hemen Arayın</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-12">
          <div>
            <h6 className="text-primary font-black uppercase tracking-widest mb-6 italic">Manisa Ofis</h6>
            <p className="text-slate-600 text-lg font-medium">
              Şehzadeler, Yunusemre ve civar tüm ilçelere aynı gün gezici servis ekiplerimiz ulaşmaktadır.
            </p>
          </div>
          <div>
            <h6 className="text-primary font-black uppercase tracking-widest mb-6 italic">Çalışma Saatleri</h6>
            <p className="text-slate-600 text-lg font-medium">
              Hafta İçi: 08:30 - 20:00<br />
              Cumartesi: 09:00 - 18:00<br />
              Pazar: Kapalı (Sadece Acil)
            </p>
          </div>
          <div>
            <h6 className="text-primary font-black uppercase tracking-widest mb-6 italic">İletişim Hattı</h6>
            <a href={`tel:${contact.phoneCall}`} className="text-foreground text-3xl font-black block mb-2 hover:text-primary transition-colors italic">
              {contact.phone}
            </a>
            <p className="text-slate-500">{contact.email}</p>
          </div>
        </div>
        <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-3xl text-left">
          <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
            <span className="text-primary block mb-2 underline decoration-2 underline-offset-4">YASAL BİLGİLENDİRME VE FERAGATNAME:</span>
            Manisa Beyaz Eşya Servisi, bölgedeki tüm marka ve model beyaz eşyalar için hizmet veren <span className="text-foreground italic">TAMAMEN ÖZEL BİR TEKNİK SERVİS</span> kuruluşudur. Firmamızın herhangi bir markanın <span className="text-foreground underline decoration-red-500">YETKİLİ SERVİSİ İLE BİR BAĞLANTISI VEYA ANLAŞMASI BULUNMAMAKTADIR.</span> Sadece <span className="text-foreground">GARANTİ SÜRESİ DOLMUŞ (GARANTİ DIŞI)</span> cihazlara teknik destek ve onarım hizmeti sunmaktayız. Web sitemizde kullanılan markalar ve logolar, ilgili hak sahiplerine ait olup, sadece tüketicinin bilgilendirilmesi amacıyla "özel servis" hizmeti verdiğimizi belirtmek için kullanılmıştır.
          </p>
        </div>
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400 font-bold uppercase tracking-[0.3em]">
          <p>© 2026 Manisa Beyaz Eşya Servisi. Design with Evolution.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Yasal Haklar</a>
            <a href="#" className="hover:text-foreground transition-colors">Gizlilik</a>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-50 flex gap-4 md:hidden">
        <a href={`tel:${contact.phoneCall}`} className="flex-1 bg-foreground text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl">
          <Phone className="size-5" /> ARA
        </a>
        <a href={`https://wa.me/${contact.whatsapp}`} className="flex-1 bg-[#25D366] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl">
          <MessageCircle className="size-5" /> WHATSAPP
        </a>
      </div>
    </div>
  );
}
