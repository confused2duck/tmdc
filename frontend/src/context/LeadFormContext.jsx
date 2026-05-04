import React, { createContext, useContext, useState, useCallback } from "react";

const LeadFormContext = createContext(null);

export const LeadFormProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [ctaSource, setCtaSource] = useState("unknown");

    const openForm = useCallback((source = "unknown") => {
        setCtaSource(source);
        setOpen(true);
    }, []);

    const closeForm = useCallback(() => setOpen(false), []);

    return (
        <LeadFormContext.Provider value={{ open, ctaSource, openForm, closeForm, setOpen }}>
            {children}
        </LeadFormContext.Provider>
    );
};

export const useLeadForm = () => {
    const ctx = useContext(LeadFormContext);
    if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
    return ctx;
};
