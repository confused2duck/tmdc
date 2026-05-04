import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLeadForm } from "../../context/LeadFormContext";

export default function FinalCTA() {
    const { openForm } = useLeadForm();

    return (
        <section
            className="relative bg-obsidian text-white py-28 md:py-40 overflow-hidden"
            data-testid="final-cta-section"
        >
            <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" aria-hidden />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-tealAccent/10 blur-3xl rounded-full pointer-events-none" aria-hidden />

            <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="flex items-center justify-center gap-3 mb-10"
                >
                    <span className="w-10 h-px bg-tealAccent" />
                    <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-tealAccent">
                        Final step
                    </span>
                    <span className="w-10 h-px bg-tealAccent" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="font-heading text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tighter"
                >
                    Lead with data.
                    <br />
                    <span className="italic font-light text-slate-400">Operate with confidence.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="mt-8 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
                >
                    DataOS gives you the control, visibility, and agility needed to make data a true
                    enterprise asset.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => openForm("final-cta-executive-briefing")}
                        data-testid="final-executive-briefing-btn"
                        className="group bg-white text-obsidian hover:bg-tealAccent transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center justify-center gap-3 min-w-[280px]"
                    >
                        Schedule an executive briefing
                        <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                    </button>
                    <button
                        onClick={() => openForm("final-cta-dataos-expert")}
                        data-testid="final-expert-btn"
                        className="group bg-transparent text-white border border-slate-600 hover:border-white transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center justify-center gap-3 min-w-[280px]"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Speak with a DataOS expert
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
