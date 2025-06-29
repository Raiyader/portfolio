import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
    const [introText, setIntroText] = useState("");
    const [nameText, setNameText] = useState("");

    const [step, setStep] = useState<"intro" | "name" | "rotate">("intro");

    const [isDeleting, setIsDeleting] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [currentRotatingIndex, setCurrentRotatingIndex] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        if (step !== "intro") return;
        const text = t("hero.introText");
        let i = 0;

        const interval = setInterval(() => {
            setIntroText(text.slice(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(interval);
                setTimeout(() => setStep("name"), 250);
            }
        }, 90);

        return () => clearInterval(interval);
    }, [step]);

    useEffect(() => {
        if (step === "intro") return;

        const text = t("hero.introText");
        setIntroText(text);
    }, [t, step]);

    useEffect(() => {
        if (step !== "name") return;
        const text = "Mert Evirgen";
        let i = 0;

        const interval = setInterval(() => {
            setNameText(text.slice(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(interval);
                setTimeout(() => setStep("rotate"), 500);
            }
        }, 90);

        return () => clearInterval(interval);
    }, [step]);

    useEffect(() => {
        if (step !== "rotate") return;
        const rawRotatingWords = t('hero.rotatingWords', { returnObjects: true });
        const rotatingWords = Array.isArray(rawRotatingWords) ? rawRotatingWords : [];
        const currentWord = rotatingWords[currentRotatingIndex];
        const typingSpeed = isDeleting ? 50 : 90;

        const handleTyping = () => {
            const isFullyTyped = displayedText === currentWord;
            const isFullyDeleted = displayedText === "";

            if (!isDeleting && !isFullyTyped) {
                setDisplayedText(currentWord.slice(0, displayedText.length + 1));
            } else if (isDeleting && !isFullyDeleted) {
                setDisplayedText(currentWord.slice(0, displayedText.length - 1));
            } else if (!isDeleting && isFullyTyped) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && isFullyDeleted) {
                setIsDeleting(false);
                setCurrentRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
            }
        };

        const timeout = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timeout);
    }, [step, displayedText, isDeleting, currentRotatingIndex]);
    return (
        <div className="relative w-screen h-screen">
            <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-center lg:bg-[center_40%] opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between min-h-screen">
                <div className="flex-1 flex flex-col justify-end text-center md:text-left">
                    <p className="text-lg font-inter text-neutral-400 mb-2">
                        {introText}
                        {step === "intro" && <span className="animate-pulse">|</span>}
                    </p>

                    <h1 className="text-5xl md:text-6xl font-semibold font-outfit text-white min-h-[4rem]">
                        {nameText}
                        {step === "name" && <span className="animate-pulse">|</span>}
                    </h1>

                    <div className="text-2xl md:text-3xl text-primary font-inter mt-3 min-h-[2.5rem]">
                        {step === "rotate" && (
                            <>
                                <span>{displayedText}</span>
                                <span className="animate-pulse">|</span>
                            </>
                        )}
                    </div>

                    <p className="mt-6 text-neutral-300 text-base font-inter max-w-md mx-auto md:mx-0">
                        {t("hero.description")}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default HeroSection