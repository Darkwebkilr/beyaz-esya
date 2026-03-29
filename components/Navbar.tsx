"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Wrench, Menu, X, ArrowLeft } from "lucide-react";
import { navLinks, contact } from "@/app/constants";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    // Handle scroll logic for the button (Only on desktop)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1000) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className="fixed top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-3">
                <div className="max-w-7xl mx-auto flex flex-col gap-2">
                    <a
                        href={`tel:${contact.phoneCall}`}
                        className="text-primary flex justify-center md:justify-end font-black text-xl md:text-2xl tracking-tighter hover:scale-105 transition-transform"
                    >
                        {contact.phone}
                    </a>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {!isHome && (
                                <Link href="/" className="group flex items-center gap-2 mr-2">
                                    <ArrowLeft className="text-primary size-5 group-hover:-translate-x-1 transition-transform" />
                                </Link>
                            )}
                            <Link
                                href="/"
                                scroll={false}
                                className="flex items-center gap-2 relative z-[110]"
                            >
                                <div className="size-8 md:size-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Wrench className="text-white size-5 md:size-6" />
                                </div>
                                <span className="text-lg md:text-xl font-black tracking-tighter text-foreground uppercase italic block">
                                    Manisa Merkez Servisi
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} className="hover:text-primary transition-colors whitespace-nowrap">
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA - Shown only after 1000px scroll */}
                        <div className="hidden md:block">
                            <a
                                href={`tel:${contact.phoneCall}`}
                                className={`bg-primary hover:bg-primary/90 text-white font-black py-2.5 px-6 rounded-full text-sm transition-all duration-500 shadow-xl shadow-primary/20 hover:scale-105 inline-block ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'}`}
                            >
                                HEMEN ARA
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            className="md:hidden relative z-[110] p-2 text-foreground hover:bg-slate-50 rounded-xl transition-colors focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X className="size-8 text-primary" /> : <Menu className="size-8" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-[90] flex flex-col items-center justify-center gap-12 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-8 w-full px-6">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-2xl font-black text-foreground italic uppercase tracking-tighter hover:text-primary transition-all duration-500 text-center w-full whitespace-nowrap ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: isMenuOpen ? `${i * 100}ms` : '0ms' }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="w-16 h-1 bg-slate-100 rounded-full" />

                <div className={`flex flex-col items-center gap-4 transition-all duration-700 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <a
                        href={`tel:${contact.phoneCall}`}
                        className="flex items-center gap-3 bg-foreground text-white font-black py-5 px-12 rounded-2xl text-xl shadow-2xl active:scale-95 transition-transform"
                    >
                        <Phone className="size-6" /> HEMEN ARA
                    </a>
                    <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        className="flex items-center gap-3 bg-[#25D366] text-white font-black py-5 px-12 rounded-2xl text-xl shadow-2xl active:scale-95 transition-transform"
                    >
                        <MessageCircle className="size-6" /> WHATSAPP
                    </a>
                </div>
            </div>
        </>
    );
}
