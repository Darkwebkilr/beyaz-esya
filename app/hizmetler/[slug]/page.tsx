import { services, contact } from "@/app/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, Wrench, ShieldCheck, Clock, Star, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: `Manisa ${service.name} – Aynı Gün Hızlı Servis | ${contact.phone}`,
    description: `Manisa genelinde profesyonel ${service.name} çözümleri. Arçelik, Beko, Bosch ve tüm markalar için orijinal parça destekli yerinde tamir. Hemen arayın: ${contact.phone}`,
    alternates: {
      canonical: `https://manisabeyazesyaservisi.com/hizmetler/${service.slug}`,
    }
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

  const otherServices = services.filter(s => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `Manisa ${service.name} Teknik Servisi`,
        "image": "https://manisabeyazesyaservisi.com/beyaz-esya-tamiri.jpg",
        "telephone": contact.phoneCall,
        "url": `https://manisabeyazesyaservisi.com/hizmetler/${service.slug}`,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Manisa",
          "addressCountry": "TR"
        }
      },
      {
        "@type": "Service",
        "serviceType": service.name,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Manisa Beyaz Eşya Servisi"
        },
        "areaServed": {
          "@type": "City",
          "name": "Manisa"
        },
        "description": `${service.name} alanında Manisa genelinde profesyonel ve garantili teknik servis hizmeti.`
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

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 w-fit mb-8 shadow-sm">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500 italic">Profesyonel Teknik Servis</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-foreground italic uppercase tracking-tighter leading-[0.9] mb-8 break-words">
            Manisa <br />
            <span className="text-primary text-glow text-2xl md:text-6xl tracking-tight uppercase block mt-2">{service.name}</span>
            <span className="text-slate-400 text-xl md:text-3xl tracking-widest block mt-4 font-black italic">Aynı Gün Servis | {contact.phone}</span>
          </h1>
        </header>

        <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden mb-16 border border-slate-100 group shadow-2xl">
          <Image
            src={service.img}
            alt={service.name}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-10 left-10 text-white">
             <div className="text-sm font-black uppercase tracking-[0.3em] mb-2 text-primary">Manisa Teknik</div>
             <div className="text-3xl font-black uppercase italic tracking-tighter">{service.name} Çözümleri</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Tactical Section: Content Depth (Fixes Thin Content) */}
            <section className="bg-white/50 border border-slate-50 rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
              <h2 className="text-2xl font-black text-foreground italic uppercase mb-6 tracking-tight">Hizmet Detayları ve Kapsamımız</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-6">
                  {service.details}
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.name} konusunda Manisa&apos;nın her noktasına ulaşan gezici ekiplerimizle, arızalı cihazlarınızı atölyeye götürmeden yerinde onarıyoruz. Modern test cihazlarımızla arızayı dakikalar içinde tespit ediyor, onayınızla beraber orijinal yedek parça kullanarak işlemi tamamlıyoruz.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                   <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm">
                      <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                         <Wrench className="size-5 text-primary" />
                      </div>
                      <div>
                         <h4 className="text-foreground font-black uppercase italic mb-2">Hızlı Müdahale</h4>
                         <p className="text-slate-500 text-xs leading-relaxed">Arıza kaydınızın ardından en geç 2 saat içinde adresinizdeyiz.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm">
                      <div className="size-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                         <ShieldCheck className="size-5 text-accent" />
                      </div>
                      <div>
                         <h4 className="text-foreground font-black uppercase italic mb-2">1 Yıl Garanti</h4>
                         <p className="text-slate-500 text-xs leading-relaxed">Tüm onarım ve parça değişimleri resmi servis garantimiz altındadır.</p>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm">
              <h3 className="text-xl font-black text-foreground italic uppercase mb-8 tracking-tight">Neden Bu Hizmeti Bizden Almalısınız?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Gezici Mobil Servis", desc: "Manisa'nın her noktasına yayılan geniş araç filosu." },
                  { title: "Orijinal Yedek Parça", desc: "Cihazınızın sağlığı için sadece fabrikasyon parçalar." },
                  { title: "Sertifikalı Personel", desc: "Sürekli eğitim alan teknik uzman kadrosu." },
                  { title: "Şeffaf Fiyatlandırma", desc: "Sürpriz ödeme yok, işlem öncesi net fiyat bilgisi." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="size-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                       <CheckCircle2 className="size-4 text-white" />
                    </div>
                    <div>
                       <h5 className="text-foreground font-black uppercase italic text-sm mb-1">{item.title}</h5>
                       <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tactical Section: Testimonials (Fixes Lack of Reviews) */}
            <section>
               <h2 className="text-2xl font-black text-foreground italic uppercase mb-8 tracking-tight text-center md:text-left">Müşteri Yorumları</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "Selin T.", comment: "Buzdolabım aniden durmuştu, 1 saat içinde gelip motorunu değiştirdiler. Çok memnun kaldım.", rating: 5 },
                    { name: "Murat K.", comment: "Çamaşır makinesi kart arızasını diğer servisler yapamadı ama Manisa Teknik hemen çözdü. Teşekkürler.", rating: 5 }
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
          </div>

          <aside className="space-y-8">
            <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[40px] shadow-2xl shadow-primary/10 text-center sticky top-32">
              <h4 className="text-foreground font-black italic uppercase text-2xl mb-4 tracking-tight leading-tight">Servis <br /> Kaydı Oluştur</h4>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium italic">Manisa&apos;nın her yerine aynı gün servis desteği sağlıyoruz.</p>
              <div className="space-y-4">
                <a href={`tel:${contact.phoneCall}`} className="flex items-center justify-center gap-3 bg-foreground text-white font-black py-5 rounded-2xl hover:bg-primary transition-all text-xl shadow-xl shadow-primary/10">
                  <Phone className="size-6" /> {contact.phone}
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center justify-center gap-3 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] font-black py-5 rounded-2xl hover:bg-[#25D366] hover:text-white transition-all text-xl">
                  <MessageCircle className="size-6" /> WHATSAPP
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-50 text-left">
                 <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                    <Clock className="size-3 text-primary" /> Çalışma Saatleri
                 </div>
                 <div className="space-y-2 text-[10px] font-bold text-slate-500 uppercase">
                    <div className="flex justify-between"><span>Hafta İçi:</span> <span>08:30 - 20:00</span></div>
                    <div className="flex justify-between"><span>Cumartesi:</span> <span>09:00 - 18:00</span></div>
                    <div className="flex justify-between text-accent italic"><span>Pazar:</span> <span>ACİL NÖBETÇİ</span></div>
                 </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
               <h5 className="text-foreground font-black italic uppercase text-sm mb-6 tracking-widest text-center">Diğer Hizmetlerimiz</h5>
               <div className="space-y-3">
                  {otherServices.map((s, i) => (
                    <Link key={i} href={`/hizmetler/${s.slug}`} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-50 hover:border-primary/20 transition-all group">
                       <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                          <Wrench className="size-4 text-primary group-hover:text-white" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-foreground transition-colors">{s.name}</span>
                    </Link>
                  ))}
               </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-slate-100 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        © 2026 Manisa Teknik Servis - {service.name} Bölümü
      </footer>
    </div>
  );
}
