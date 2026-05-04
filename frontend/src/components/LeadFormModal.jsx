import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useLeadForm } from "../context/LeadFormContext";

const API_BASE = (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
const API = `${API_BASE}/api`;

const FIELD =
    "w-full border-0 border-b border-slate-300 bg-transparent rounded-none px-0 py-3 text-[15px] text-obsidian placeholder:text-slate-400 focus:border-obsidian focus:outline-none focus:ring-0 transition-colors";

export default function LeadFormModal() {
    const { open, ctaSource, closeForm } = useLeadForm();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
    });

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleClose = () => {
        closeForm();
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: "", email: "", company: "", phone: "", message: "" });
        }, 250);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim()) {
            toast.error("Please enter your name and work email.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await axios.post(`${API}/leads`, {
                ...form,
                cta_source: ctaSource,
            });
            if (res?.data?.success) {
                setSubmitted(true);
                toast.success(res.data.message || "Thanks! We'll be in touch.");
                if (typeof window !== "undefined" && typeof window.trackLeadConversion === "function") {
                    window.trackLeadConversion(ctaSource);
                }
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (err) {
            const detail = err?.response?.data?.detail;
            toast.error(
                typeof detail === "string"
                    ? detail
                    : "Could not submit your request. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="lead-modal"
                    data-testid="lead-form-modal"
                    className="fixed inset-0 z-[100] flex items-stretch justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        className="relative z-10 ml-auto h-full w-full max-w-[560px] bg-white shadow-2xl overflow-y-auto no-scrollbar"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 32 }}
                    >
                        <button
                            onClick={handleClose}
                            data-testid="lead-form-close-btn"
                            aria-label="Close form"
                            className="absolute top-6 right-6 text-slate-500 hover:text-obsidian transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="px-8 md:px-12 pt-14 pb-12">
                            {!submitted ? (
                                <>
                                    <p className="text-[11px] uppercase tracking-[0.24em] font-bold text-tealAccent">
                                        {ctaSource?.replaceAll("-", " ") || "Get started"}
                                    </p>
                                    <h3 className="mt-3 font-heading text-3xl md:text-4xl font-medium leading-tight text-obsidian">
                                        Let's talk about your data lifecycle.
                                    </h3>
                                    <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
                                        Share a few details and a DataOS strategist will reach out within one business day.
                                    </p>

                                    <form
                                        onSubmit={onSubmit}
                                        className="mt-10 space-y-7"
                                        data-testid="lead-form"
                                    >
                                        <div>
                                            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
                                                Full name *
                                            </label>
                                            <input
                                                data-testid="lead-form-name"
                                                className={FIELD}
                                                value={form.name}
                                                onChange={update("name")}
                                                placeholder="Jane Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
                                                Work email *
                                            </label>
                                            <input
                                                data-testid="lead-form-email"
                                                type="email"
                                                className={FIELD}
                                                value={form.email}
                                                onChange={update("email")}
                                                placeholder="jane@company.com"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
                                                    Company
                                                </label>
                                                <input
                                                    data-testid="lead-form-company"
                                                    className={FIELD}
                                                    value={form.company}
                                                    onChange={update("company")}
                                                    placeholder="Acme Corp"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
                                                    Phone
                                                </label>
                                                <input
                                                    data-testid="lead-form-phone"
                                                    className={FIELD}
                                                    value={form.phone}
                                                    onChange={update("phone")}
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
                                                What are you looking to solve?
                                            </label>
                                            <textarea
                                                data-testid="lead-form-message"
                                                className={`${FIELD} resize-none`}
                                                value={form.message}
                                                onChange={update("message")}
                                                placeholder="Briefly describe your data challenges..."
                                                rows={3}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            data-testid="lead-form-submit-btn"
                                            className="group w-full bg-obsidian text-white hover:bg-obsidianHover transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Request a strategy call
                                                    <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            By submitting, you agree to be contacted about DataOS. We respect your inbox, no spam.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div
                                    className="flex flex-col items-start gap-6 pt-12"
                                    data-testid="lead-form-success"
                                >
                                    <div className="w-14 h-14 border border-obsidian flex items-center justify-center">
                                        <CheckCircle2 className="w-7 h-7 text-obsidian" />
                                    </div>
                                    <h3 className="font-heading text-3xl md:text-4xl font-medium leading-tight text-obsidian">
                                        You're on our radar.
                                    </h3>
                                    <p className="text-slate-600 text-[15px] leading-relaxed">
                                        A DataOS strategist will be in touch within one business day. In the meantime, explore how our customers have
                                        cut time-to-insight by up to 40%.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        data-testid="lead-form-close-success-btn"
                                        className="mt-4 group bg-obsidian text-white hover:bg-obsidianHover transition-all duration-300 rounded-none px-8 py-4 font-medium text-[15px] inline-flex items-center gap-3"
                                    >
                                        Close
                                        <ArrowRight className="w-4 h-4 hero-cta-arrow" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
