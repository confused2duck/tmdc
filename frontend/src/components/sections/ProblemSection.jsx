import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Banknote, BarChart3 } from "lucide-react";

const pains = [
    "Data platforms are fragmented across tools and teams",
    "Governance is reactive, not embedded",
    "Time-to-insight remains slow, causing product demo delays",
    "Business teams lack trusted, accessible data",
];

const drawbacks = [
    { title: "Missed opportunities", icon: TrendingDown },
    { title: "Rising costs", icon: Banknote },
    { title: "Limited ROI on data investments", icon: BarChart3 },
];

export default function ProblemSection() {
    return (
        <section
            className="relative bg-obsidian text-white py-24 md:py-32 overflow-hidden"
            data-testid="problem-section"
        >
            <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" aria-hidden />
            <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-tealAccent/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <span className="w-10 h-px bg-tealAccent" />
                    <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-tealAccent">
                        Executive problem statement
                    </span>
                </motion.div>

                <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                    <div className="md:col-span-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight"
                        >
                            Your data strategy is only as strong as its <span className="text-tealAccent">execution.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="mt-6 text-slate-300 text-lg leading-relaxed max-w-lg"
                        >
                            Most organizations still struggle to operationalize data. The result: insights arrive
                            late, trust is eroded, and ROI suffers.
                        </motion.p>
                    </div>

                    <div className="md:col-span-6">
                        <ul className="space-y-0">
                            {pains.map((p, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="group flex items-start gap-4 py-5 border-b border-slate-800 hover:border-tealAccent transition-colors"
                                >
                                    <span className="mt-1 w-6 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                                        0{i + 1}
                                    </span>
                                    <p className="text-[17px] text-slate-200 group-hover:text-white transition-colors leading-snug">
                                        {p}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Drawbacks row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-20 md:mt-28 pt-10 border-t border-slate-800"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <AlertTriangle className="w-4 h-4 text-tealAccent" />
                        <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-slate-400">
                            The cost of bad data
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {drawbacks.map(({ title, icon: Icon }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="group border border-slate-800 p-8 hover:border-tealAccent hover:-translate-y-1 transition-all duration-300"
                                data-testid={`drawback-card-${i}`}
                            >
                                <div className="w-10 h-10 border border-slate-700 group-hover:border-tealAccent flex items-center justify-center mb-6 transition-colors">
                                    <Icon className="w-4 h-4 text-tealAccent" />
                                </div>
                                <p className="font-heading text-xl font-medium leading-snug text-white">
                                    {title}
                                </p>
                                <span className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                                    0{i + 1} / 03
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
