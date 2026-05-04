import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plug, Shuffle, Shield, Share2 } from "lucide-react";
import { useLeadForm } from "../../context/LeadFormContext";

const pillars = [
    {
        icon: Plug,
        title: "Connect to any data source",
        desc: "Warehouses, lakes, SaaS, streaming, files — all unified.",
    },
    {
        icon: Shuffle,
        title: "Transform and orchestrate pipelines",
        desc: "From raw to production-grade without glue code.",
    },
    {
        icon: Shield,
        title: "Govern and secure data assets",
        desc: "Policies, lineage and compliance, by design.",
    },
    {
        icon: Share2,
        title: "Deliver insights to apps and users",
        desc: "APIs, BI, AI — consumable data everywhere.",
    },
];

export default function SolutionSection() {
    const { openForm } = useLeadForm();

    return (
        <section
            id="solution"
            className="relative bg-white py-24 md:py-32"
            data-testid="solution-section"
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-3xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-10 h-px bg-obsidian" />
                        <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian">
                            The solution
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-obsidian">
                        One platform. <span className="text-slate-400 italic font-light">Complete</span> data lifecycle.
                    </h2>
                    <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                        DataOS brings everything together, so your data flows seamlessly from source to insight —
                        without friction. From ingestion to consumption, everything is unified.
                    </p>
                </motion.div>

                {/* Bento grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    {pillars.map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className={`group relative border border-slate-200 bg-white p-8 md:p-10 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
                                i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : i === 2 ? "md:col-span-5" : "md:col-span-7"
                            }`}
                            data-testid={`solution-pillar-${i}`}
                        >
                            <div className="absolute top-0 left-0 w-8 h-px bg-tealAccent group-hover:w-full transition-all duration-500" aria-hidden />
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-11 h-11 border border-slate-300 flex items-center justify-center group-hover:border-obsidian transition-colors">
                                    <Icon className="w-5 h-5 text-obsidian" />
                                </div>
                                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 pt-3">
                                    0{i + 1}
                                </span>
                            </div>
                            <h3 className="font-heading text-xl md:text-2xl font-medium leading-snug text-obsidian">
                                {title}
                            </h3>
                            <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
                                {desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-slate-200 pt-10"
                >
                    <p className="font-heading text-2xl font-medium text-obsidian">
                        Ready to unify your stack?
                    </p>
                    <button
                        onClick={() => openForm("solution-register-now")}
                        data-testid="solution-register-btn"
                        className="group bg-obsidian text-white hover:bg-obsidianHover transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center gap-3"
                    >
                        Register now
                        <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
