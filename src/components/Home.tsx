import { useEffect } from "react";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const scrollTo = location.state?.scrollTo;
    useEffect(() => {
        if (scrollTo) {
            const timer = setTimeout(() => {
                const el = document.getElementById(scrollTo);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [scrollTo]);
    return (
        <div className="min-h-screen w-full bg-portfoliobg text-white flex flex-col items-center">
            <HeroSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}
