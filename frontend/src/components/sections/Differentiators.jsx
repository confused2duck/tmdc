import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, FileLock2, Globe2, Target } from "lucide-react";
import { useLeadForm } from "../../context/LeadFormContext";

const items = [
    {
        icon: Layers,
        title: "Unified lifecycle management",
        body: "From ingestion to consumption, every stage is connected, observable and controlled.",
    },
    {
        icon: FileLock2,
        title: "Policy-driven by design",
        body: "Governance isn't an overlay — it's built into how data flows and is accessed.",
    },
    {
        icon: Globe2,
        title: "Cross-environment control",
        body: "Operate seamlessly across cloud, hybrid, and multi-platform ecosystems.",
    },
    {
        icon: Target,
        title: "Business-aligned architecture",
        body: "Shift from long pipelines to data products aligned with business domains and outcomes.",
    },
];

export default function Differentiators() {
    const { openForm } = useLeadForm();

    return (
        <section
            className="relative bg-obsidian text-white py-24 md:py-32 overflow-hidden"
            data-testid="differentiators-section"
        >
            <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" aria-hidden />
            <div className="absolute top-1/2 -right-32 w-[420px] h-[420px] bg-electricBlue/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="max-w-3xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-10 h-px bg-tealAccent" />
                        <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-tealAccent">
                            What sets DataOS apart
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
                        Built for modern data <span className="italic font-light text-slate-400">operations.</span>
                    </h2>
                </motion.div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-slate-800">
                    {items.map(({ icon: Icon, title, body }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="group border-r border-b border-slate-800 p-8 md:p-12 hover:bg-[#111726] transition-colors duration-300"
                            data-testid={`differentiator-${i}`}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-12 h-12 border border-slate-700 group-hover:border-tealAccent flex items-center justify-center transition-colors">
                                    <Icon className="w-5 h-5 text-tealAccent" />
                                </div>
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                                    / 0{i + 1}
                                </span>
                            </div>
                            <h3 className="font-heading text-2xl md:text-3xl font-medium leading-snug text-white">
                                {title}
                            </h3>
                            <p className="mt-4 text-slate-400 text-[15px] leading-relaxed max-w-md">
                                {body}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <button
                        onClick={() => openForm("differentiators-free-trial")}
                        data-testid="differentiators-cta-btn"
                        className="group bg-white text-obsidian hover:bg-tealAccent hover:text-obsidian transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center gap-3"
                    >
                        Try 15 days free trial of DataOS
                        <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                    </button>
                    <p className="text-slate-400 text-[13px]">
                        No credit card required · Full platform access
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
