import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useLeadForm } from "../context/LeadFormContext";

export default function StickyCTA() {
    const { openForm } = useLeadForm();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const trigger = window.innerHeight * 0.9;
            setVisible(window.scrollY > trigger);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="sticky-cta"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] md:w-auto"
                    data-testid="sticky-cta-bar"
                >
                    <div className="bg-obsidian text-white border border-slate-700 shadow-2xl px-5 py-4 md:px-6 md:py-4 flex items-center gap-4 md:gap-6">
                        <div className="hidden md:flex items-center gap-3 pr-2">
                            <div className="w-9 h-9 border border-slate-600 flex items-center justify-center">
                                <Phone className="w-4 h-4 text-tealAccent" />
                            </div>
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                                    Ready to operationalize data?
                                </p>
                                <p className="text-[14px] font-medium">
                                    Talk to a DataOS strategist.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => openForm("sticky-cta-book-call")}
                            data-testid="sticky-cta-btn"
                            className="group bg-white text-obsidian hover:bg-tealAccent hover:text-obsidian transition-all duration-300 rounded-none px-5 py-3 text-[14px] font-medium inline-flex items-center gap-2 whitespace-nowrap"
                        >
                            Book a strategy call
                            <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
