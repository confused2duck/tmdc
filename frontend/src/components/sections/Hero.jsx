import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLeadForm } from "../../context/LeadFormContext";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function Hero() {
    const { openForm } = useLeadForm();

    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative pt-32 md:pt-40 pb-24 md:pb-32 bg-white overflow-hidden"
        >
            {/* background grid */}
            <div className="absolute inset-0 bg-grid-slate mask-radial opacity-70 pointer-events-none" aria-hidden />

            {/* glowing accent orbs */}
            <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-tealAccent/20 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute top-1/2 -left-32 w-[280px] h-[280px] rounded-full bg-electricBlue/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
                {/* eyebrow */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="flex items-center gap-3 mb-8"
                >
                    <span className="w-10 h-px bg-obsidian" />
                    <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian">
                        Data Lifecycle Platform
                    </span>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="font-heading font-medium text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tighter text-obsidian max-w-5xl"
                    data-testid="hero-heading"
                >
                    Manage Data Lifecycle{" "}
                    <span className="italic font-light text-slate-500">End-to-End,</span>
                    <br />
                    Turn Data Into Data Products{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10 text-obsidian">40% Faster</span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 right-0 bottom-1 h-3 bg-tealAccent/60 origin-left -z-0"
                            aria-hidden
                        />
                    </span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed"
                >
                    DataOS provides unified control for your entire data lifecycle — helping you reduce
                    complexity, ensure lineage, enforce governance, and accelerate business outcomes from data.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                >
                    <button
                        onClick={() => openForm("hero-primary-book-call")}
                        data-testid="hero-primary-cta-btn"
                        className="group bg-obsidian text-white hover:bg-obsidianHover transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center justify-center gap-3"
                    >
                        Book a Data Strategy Call
                        <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                    </button>
                    <a
                        href="#lifecycle"
                        data-testid="hero-secondary-cta-btn"
                        className="group bg-white text-obsidian border border-obsidian hover:bg-slate-50 transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center justify-center gap-3"
                    >
                        See How DataOS Works
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    </a>
                </motion.div>

                {/* trust bar — 30+ enterprise customers */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                    className="mt-20 md:mt-24 border-t border-slate-200 pt-10"
                >
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                        <div className="md:col-span-4">
                            <div className="flex items-baseline gap-2">
                                <span className="font-heading text-6xl md:text-7xl font-light tracking-tighter text-obsidian leading-none">
                                    30
                                </span>
                                <span className="font-heading text-5xl md:text-6xl font-light text-tealAccent">
                                    +
                                </span>
                            </div>
                            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] font-bold text-slate-500">
                                Enterprise customers trust DataOS
                            </p>
                        </div>

                        <div className="md:col-span-8 relative edge-fade-x overflow-hidden">
                            <div className="flex items-center gap-12 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
                                {[...Array(2)].map((_, loop) => (
                                    <div key={loop} className="flex items-center gap-12">
                                        {[
                                            "MERIDIAN", "NORTHWIND", "ATLAS", "HELIX", "OBSIDIAN",
                                            "LINEAR", "APEX", "VERTEX", "NIMBUS", "HORIZON",
                                            "LUMEN", "CATALYST", "SUMMIT", "FORGE", "KINETIC",
                                            "ORBIT", "STRATA", "PRISM", "ECLIPSE", "VANGUARD",
                                            "NOVA", "ZENITH", "COBALT", "PULSAR", "TITAN",
                                            "AXION", "HELIOS", "ODYSSEY", "QUANTUM", "VECTOR",
                                        ].map((name) => (
                                            <span
                                                key={`${loop}-${name}`}
                                                className="font-heading font-medium text-slate-400 tracking-[0.22em] text-[13px] hover:text-obsidian transition-colors"
                                            >
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
