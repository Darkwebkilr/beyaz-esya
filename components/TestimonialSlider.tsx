"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmet Y.",
    location: "Yunusemre",
    comment: "Buzdolabım soğutmuyordu, aradıktan 40 dakika sonra geldiler. Motor arızasını hemen tespit edip yerinde çözdüler. Manisa'da çağırdığım en dürüst ve hızlı servisti. Teşekkürler!",
    rating: 5
  },
  {
    name: "Melis K.",
    location: "Turgutlu",
    comment: "Çamaşır makinesi kart arızası için birçok yer 'yapılamaz' dedi. Manisa Teknik Servis ekibi aynı gün gelip kartı tamir etti. Hem çok uygun fiyatlı hem de garantili hizmet verdiler.",
    rating: 5
  },
  {
    name: "Mustafa G.",
    location: "Şehzadeler",
    comment: "Kombi bakımı ve petek temizliği yaptırdım. Çok titiz çalıştılar, her yer tertemiz kaldı. Fatura konusunda da sürpriz yapmadılar, ne dedilerse o. Güvenle çağırabilirsiniz.",
    rating: 5
  }
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 overflow-hidden">
      <div className="absolute top-0 left-0 p-4 opacity-5">
        <Quote className="size-24 text-primary fill-primary" />
      </div>

      <div className="relative h-[350px] md:h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center gap-1">
              {[...Array(testimonials[index].rating)].map((_, i) => (
                <Star key={i} className="fill-accent text-accent size-6" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl italic font-bold text-white leading-relaxed">
              &quot;{testimonials[index].comment}&quot;
            </p>
            
            <div>
              <div className="text-primary font-black uppercase tracking-[0.2em] italic">
                {testimonials[index].name}
              </div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                {testimonials[index].location} / Manisa
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={prev}
          className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all active:scale-90"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button 
          onClick={next}
          className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all active:scale-90"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-8 bg-primary" : "w-2 bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
}
