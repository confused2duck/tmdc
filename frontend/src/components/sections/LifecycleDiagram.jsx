import React from "react";
import { motion } from "framer-motion";
import {
    Database,
    GitBranch,
    Lock,
    Sparkles,
    Check,
} from "lucide-react";

const stages = [
    {
        key: "ingest",
        num: "01",
        title: "Ingest",
        subtitle: "Any source, any shape, any speed.",
        icon: Database,
        description:
            "Bring in data from any source — structured or unstructured, batch or real-time.",
        bullets: [
            "Pre-built connectors",
            "Streaming & batch ingestion",
            "Scalable and reliable pipelines",
        ],
    },
    {
        key: "organize",
        num: "02",
        title: "Organize & Transform",
        subtitle: "Raw to production-grade, fast.",
        icon: GitBranch,
        description:
            "Turn raw data into usable, trusted datasets — with modelling, orchestration and versioning built in.",
        bullets: [
            "Data modeling and transformation",
            "Workflow orchestration",
            "Versioning and lineage tracking",
        ],
    },
    {
        key: "govern",
        num: "03",
        title: "Govern",
        subtitle: "Trust, encoded into every layer.",
        icon: Lock,
        description:
            "Ensure your data is secure, compliant, and trustworthy — governance embedded, not bolted on.",
        bullets: [
            "Fine-grained access control",
            "Data policies and auditing",
            "Metadata management",
        ],
    },
    {
        key: "serve",
        num: "04",
        title: "Serve & Consume",
        subtitle: "Data products wherever you work.",
        icon: Sparkles,
        description:
            "Deliver data where it matters most — apps, dashboards, and AI.",
        bullets: [
            "APIs and data products",
            "BI and analytics integrations",
            "Self-service data access",
        ],
    },
];

export default function LifecycleDiagram() {
    return (
        <section
            id="lifecycle"
            className="relative bg-slate-50 py-24 md:py-32 overflow-hidden"
            data-testid="lifecycle-section"
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-3xl mb-16 md:mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-10 h-px bg-obsidian" />
                        <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian">
                            How it works
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-obsidian">
                        The DataOS lifecycle, <span className="italic font-light text-slate-400">broken down.</span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                        Four connected stages — each unifying tools, teams and governance into one flow.
                    </p>
                </motion.div>

                {/* Vertical timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* vertical connector line */}
                    <div
                        className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-slate-300"
                        aria-hidden
                    />

                    <ol className="space-y-16 md:space-y-24">
                        {stages.map((s, i) => {
                            const Icon = s.icon;
                            const isRight = i % 2 === 1;
                            return (
                                <motion.li
                                    key={s.key}
                                    data-testid={`lifecycle-stage-${s.key}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="relative md:grid md:grid-cols-2 md:gap-12 items-start"
                                >
                                    {/* Node marker */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 z-10 w-14 h-14 bg-obsidian border border-obsidian flex items-center justify-center"
                                    >
                                        <Icon className="w-5 h-5 text-tealAccent" />
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-tealAccent text-obsidian text-[10px] font-bold flex items-center justify-center font-mono">
                                            {s.num}
                                        </span>
                                    </motion.div>

                                    {/* Content card — alternating sides on desktop */}
                                    <div
                                        className={`pl-20 md:pl-0 ${
                                            isRight
                                                ? "md:col-start-2 md:pl-12"
                                                : "md:col-start-1 md:pr-12 md:text-right"
                                        }`}
                                    >
                                        <div
                                            className={`group bg-white border border-slate-200 p-7 md:p-9 hover:border-obsidian hover:shadow-xl transition-all duration-300 ${
                                                isRight ? "md:text-left" : "md:text-right"
                                            }`}
                                        >
                                            <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-slate-400 font-mono">
                                                Stage {s.num} / 04
                                            </p>
                                            <h3 className="mt-3 font-heading text-3xl md:text-4xl font-medium leading-tight tracking-tight text-obsidian">
                                                {s.title}
                                            </h3>
                                            <p className="mt-2 text-slate-500 text-[15px]">
                                                {s.subtitle}
                                            </p>
                                            <div className={`mt-6 h-px w-16 bg-tealAccent ${isRight ? "" : "md:ml-auto"}`} />
                                            <p className="mt-6 text-slate-700 text-[15px] leading-relaxed">
                                                {s.description}
                                            </p>
                                            <ul className={`mt-6 space-y-3 ${isRight ? "" : "md:text-left"}`}>
                                                {s.bullets.map((b) => (
                                                    <li
                                                        key={b}
                                                        className={`flex items-start gap-3 ${
                                                            isRight ? "" : "md:justify-end md:flex-row-reverse md:gap-3"
                                                        }`}
                                                    >
                                                        <span className="mt-1 w-5 h-5 border border-obsidian flex items-center justify-center flex-shrink-0">
                                                            <Check className="w-3 h-3 text-obsidian" strokeWidth={3} />
                                                        </span>
                                                        <span className="text-[15px] text-slate-700">{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ol>

                    {/* terminus marker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true, amount: 0.6 }}
                        className="relative md:mx-auto mt-12 ml-0 md:ml-0 flex md:justify-center"
                    >
                        <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-obsidian text-tealAccent flex items-center justify-center text-xs font-mono font-bold">
                            ✓
                        </div>
                        <div className="pl-20 md:pl-0 md:pt-14 text-center w-full">
                            <p className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian md:mt-0 mt-2">
                                Data product, delivered.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
