import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLeadForm } from "../context/LeadFormContext";

export default function NavBar() {
    const { openForm } = useLeadForm();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { label: "Solution", href: "#solution" },
        { label: "Lifecycle", href: "#lifecycle" },
        { label: "Outcomes", href: "#outcomes" },
        { label: "Use Cases", href: "#use-cases" },
    ];

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? "bg-white/85 backdrop-blur-xl border-b border-slate-200" : "bg-transparent"
            }`}
            data-testid="top-navbar"
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
                <a href="#top" className="flex items-center gap-3" data-testid="nav-logo">
                    <img
                        src="https://customer-assets.emergentagent.com/job_dataos-modern/artifacts/t33ydmfo_66b0518110de7d4d50c5df3c_TMDC%20Apple%20Icon.png"
                        alt="The Modern Data Company"
                        className="w-8 h-8 rounded-[6px] object-cover"
                    />
                    <span className="font-heading text-[17px] font-semibold tracking-tight text-obsidian">
                        DataOS
                    </span>
                    <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] text-slate-500 ml-2 border-l border-slate-300 pl-3">
                        by The Modern Data Co.
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-9">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="text-[14px] text-slate-600 hover:text-obsidian transition-colors font-medium"
                            data-testid={`nav-link-${l.label.toLowerCase().replaceAll(" ", "-")}`}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => openForm("navbar-book-call")}
                        data-testid="navbar-cta-btn"
                        className="hidden md:inline-flex group items-center gap-2 bg-obsidian text-white hover:bg-obsidianHover transition-all duration-300 rounded-none px-5 py-3 text-[14px] font-medium"
                    >
                        Book a call
                        <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                    </button>
                    <button
                        className="md:hidden p-2 text-obsidian"
                        onClick={() => setMobileOpen((v) => !v)}
                        data-testid="mobile-menu-btn"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-[15px] text-slate-700 hover:text-obsidian"
                            >
                                {l.label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                openForm("navbar-book-call-mobile");
                            }}
                            className="mt-2 bg-obsidian text-white rounded-none px-5 py-3 text-[14px] font-medium inline-flex items-center justify-center gap-2"
                        >
                            Book a call <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </motion.header>
    );
}
