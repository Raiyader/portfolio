import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { container, item } from "../util/sectionReveal";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
    const { t } = useTranslation();

    const [copied, setCopied] = useState(false);
    const [inFillColor, setInFillColor] = useState("#1e1e1e");
    const [outFillColor, setOutFillColor] = useState("#fff");
    const email = "evrgnmert@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <section
            id="contact"
            className="bg-[#1e1e1e] w-full text-white py-16 px-4 sm:px-6 lg:px-8"
        >
            <motion.div
                className="max-w-3xl mx-auto text-center"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    className="text-3xl sm:text-4xl font-outfit font-bold mb-6"
                    variants={item}
                >
                    {t("contactSection.title", "Let's Connect")}
                </motion.h2>

                <motion.p
                    className="text-neutral-400 mb-8 font-inter"
                    variants={item}
                >
                    {t(
                        "contactSection.description",
                        "Feel free to get in touch via email or connect with me on LinkedIn."
                    )}
                </motion.p>

                <motion.div
                    className="flex flex-col items-center font-inter space-y-2 mb-10"
                    variants={item}
                >
                    <div className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                            />
                        </svg>
                        <a
                            href={`mailto:${email}`}
                            className="text-lg text-white hover:underline transition"
                        >
                            {email}
                        </a>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={copyToClipboard}
                        className="flex items-center gap-x-2 text-sm text-neutral-400 hover:text-white transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                            />
                        </svg>
                        {copied ? t("contactSection.copied", "Copied!") : t("contactSection.copy", "Click to copy")}
                    </motion.button>
                </motion.div>

                <motion.div
                    className="flex justify-center items-center gap-4"
                    variants={item}
                >
                    <Link
                        to="https://www.linkedin.com/in/evirgenmert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start text-neutral-300 hover:text-white font-inter space-x-0.5 transition"
                        onMouseEnter={() => {
                            setInFillColor("#fff");
                            setOutFillColor("#007EBB");
                        }}
                        onMouseLeave={() => {
                            setInFillColor("#1e1e1e");
                            setOutFillColor("#fff");
                        }}
                    >
                        <span className="text-xl">Linked</span>
                        <svg height="24" viewBox="0 0 72 72" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill={outFillColor} /><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill={inFillColor} /></g></svg>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ContactSection;
