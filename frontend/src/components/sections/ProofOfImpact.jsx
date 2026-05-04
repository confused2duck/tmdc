import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    {
        value: "40",
        suffix: "%",
        label: "Faster time-to-insight across business units",
    },
    {
        value: "3",
        suffix: "x",
        label: "Improved data trust and adoption",
    },
    {
        value: "55",
        suffix: "%",
        label: "Reduced operational overhead",
    },
    {
        value: "10",
        suffix: "+",
        label: "Years of future-ready data architecture",
    },
];

function Counter({ to, suffix, duration = 1.4 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const target = parseInt(to, 10);
        const start = performance.now();
        let raf;
        const step = (t) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [inView, to, duration]);

    return (
        <span ref={ref}>
            {value}
            {suffix}
        </span>
    );
}

export default function ProofOfImpact() {
    return (
        <section
            className="relative bg-white py-24 md:py-32"
            data-testid="proof-section"
        >
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="max-w-3xl mb-16"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-10 h-px bg-obsidian" />
                        <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-obsidian">
                            Proof of impact
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-obsidian">
                        What you can <span className="italic font-light text-slate-400">expect.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="border-b border-r border-slate-200 p-8 md:p-10 bg-white"
                            data-testid={`proof-stat-${i}`}
                        >
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                                / 0{i + 1}
                            </p>
                            <p className="mt-6 font-heading text-6xl md:text-7xl font-light text-obsidian leading-none tracking-tighter">
                                <Counter to={s.value} suffix={s.suffix} />
                            </p>
                            <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
