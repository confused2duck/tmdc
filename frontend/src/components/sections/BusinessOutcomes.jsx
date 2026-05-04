import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingDown, ShieldCheck, Boxes } from "lucide-react";

const outcomes = [
    {
        icon: Zap,
        title: "Drive faster decision-making",
        body: "Deliver trusted, ready-to-use data across the organization, so leaders act with confidence — not delay.",
    },
    {
        icon: TrendingDown,
        title: "Reduce cost & complexity",
        body: "Consolidate fragmented tools into a single operational framework, lowering total cost of ownership.",
    },
    {
        icon: ShieldCheck,
        title: "Operationalize governance",
        body: "Embed security, compliance, and policies directly into the data lifecycle — without slowing innovation.",
    },
    {
        icon: Boxes,
        title: "Enable data as a product",
        body: "Transform data into reusable, discoverable assets that power business initiatives and digital products.",
    },
];

export default function BusinessOutcomes() {
    return (
        <section
            id="outcomes"
            className="relative bg-white py-24 md:py-32"
            data-testid="business-outcomes-section"
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.4 }}
                        className="md:col-span-7"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-10 h-px bg-obsidian" />
                            <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian">
                                Business outcomes
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-obsidian">
                            Measurable impact, <span className="italic font-light text-slate-400">across the stack.</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        className="md:col-span-5 text-lg text-slate-600 leading-relaxed"
                    >
                        DataOS translates platform capability into tangible business outcomes — faster decisions,
                        lower cost, embedded trust, and reusable data products.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-slate-200">
                    {outcomes.map(({ icon: Icon, title, body }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="group border-b border-r border-slate-200 p-8 md:p-12 bg-white hover:bg-slate-50 transition-colors duration-300"
                            data-testid={`outcome-card-${i}`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 border border-slate-300 flex items-center justify-center group-hover:bg-obsidian group-hover:border-obsidian transition-colors">
                                    <Icon className="w-5 h-5 text-obsidian group-hover:text-tealAccent transition-colors" />
                                </div>
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                                    Outcome 0{i + 1}
                                </span>
                            </div>
                            <h3 className="font-heading text-2xl md:text-3xl font-medium leading-snug text-obsidian">
                                {title}
                            </h3>
                            <p className="mt-4 text-slate-600 text-[15px] leading-relaxed max-w-md">
                                {body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
