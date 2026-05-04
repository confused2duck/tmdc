import React from "react";
import { motion } from "framer-motion";

const useCases = [
    "Enterprise data modernization",
    "Data governance transformation",
    "Real-time operational intelligence",
    "Customer 360 & personalization",
    "AI & advanced analytics enablement",
];

export default function UseCases() {
    return (
        <section
            id="use-cases"
            className="relative bg-slate-50 py-24 md:py-32"
            data-testid="use-cases-section"
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.4 }}
                        className="md:col-span-5"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-10 h-px bg-obsidian" />
                            <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian">
                                Strategic use cases
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-obsidian">
                            Where DataOS <span className="italic font-light text-slate-400">delivers.</span>
                        </h2>
                        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
                            From enterprise modernization to AI enablement, DataOS is designed for the
                            hardest data problems in the enterprise.
                        </p>
                    </motion.div>

                    <div className="md:col-span-7 flex flex-wrap gap-3 md:gap-4 content-start">
                        {useCases.map((c, i) => (
                            <motion.div
                                key={c}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="use-chip border border-obsidian px-6 py-4 text-[15px] font-medium text-obsidian cursor-pointer"
                                data-testid={`use-case-${i}`}
                            >
                                <span className="text-tealAccent font-mono text-[11px] mr-3">
                                    0{i + 1}
                                </span>
                                {c}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
