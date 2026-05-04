import React from "react";

export default function Footer() {
    return (
        <footer className="relative bg-obsidian text-white border-t border-slate-800 py-12" data-testid="footer">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-3">
                    <img
                        src="https://customer-assets.emergentagent.com/job_dataos-modern/artifacts/t33ydmfo_66b0518110de7d4d50c5df3c_TMDC%20Apple%20Icon.png"
                        alt="The Modern Data Company"
                        className="w-7 h-7 rounded-[5px] object-cover"
                    />
                    <span className="font-heading text-[15px] font-semibold tracking-tight">
                        DataOS
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500 ml-2 border-l border-slate-700 pl-3">
                        by The Modern Data Co.
                    </span>
                </div>
                <p className="text-[13px] text-slate-400">
                    © {new Date().getFullYear()} The Modern Data Company. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-[13px] text-slate-400">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Security</a>
                </div>
            </div>
        </footer>
    );
}
