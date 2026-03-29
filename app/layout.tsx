import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manisa Beyaz Eşya Servisi | Hızlı ve Güvenilir Teknik Servis",
  description: "Manisa'da buzdolabı, çamaşır makinesi, bulaşık makinesi ve tüm beyaz eşyalarınız için aynı gün servis imkanı. Orijinal yedek parça desteği.",
  keywords: "manisa beyaz eşya servisi, buzdolabı tamiri manisa, çamaşır makinesi servisi manisa, bulaşık makinesi tamiri, teknik servis manisa, Yunusemre, Şehzadeler, Akhisar, Turgutlu, Salihli, Soma, Alaşehir, Saruhanlı, Kula, Kırkağaç, Demirci, Sarıgöl, Gördes, Selendi, Ahmetli, Gölmarmara, Köprübaşı",
  authors: [{ name: "Manisa Teknik Servis" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
