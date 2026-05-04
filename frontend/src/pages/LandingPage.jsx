import React from "react";
import { LeadFormProvider } from "../context/LeadFormContext";
import NavBar from "../components/NavBar";
import StickyCTA from "../components/StickyCTA";
import LeadFormModal from "../components/LeadFormModal";
import Hero from "../components/sections/Hero";
import ProblemSection from "../components/sections/ProblemSection";
import SolutionSection from "../components/sections/SolutionSection";
import LifecycleDiagram from "../components/sections/LifecycleDiagram";
import BusinessOutcomes from "../components/sections/BusinessOutcomes";
import Differentiators from "../components/sections/Differentiators";
import UseCases from "../components/sections/UseCases";
import ProofOfImpact from "../components/sections/ProofOfImpact";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/sections/Footer";
import { Toaster } from "../components/ui/sonner";

export default function LandingPage() {
    return (
        <LeadFormProvider>
            <div className="relative bg-white text-obsidian" data-testid="landing-page">
                <NavBar />
                <main>
                    <Hero />
                    <ProblemSection />
                    <SolutionSection />
                    <LifecycleDiagram />
                    <BusinessOutcomes />
                    <Differentiators />
                    <UseCases />
                    <ProofOfImpact />
                    <FinalCTA />
                </main>
                <Footer />
                <StickyCTA />
                <LeadFormModal />
                <Toaster position="top-center" richColors />
            </div>
        </LeadFormProvider>
    );
}
