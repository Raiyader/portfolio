import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { container, item } from "../util/sectionReveal";
import { useTranslation } from "react-i18next";

export default function ProjectsSection() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const clickHandler = () => {
        navigate("/projects", { state: { direction: "right" } });
    };

    return (
        <section className="w-full bg-[#808080] mx-auto md:px-10 md:pb-5 px-5 pt-5 pb-10 flex flex-col md:flex-row justify-center items-center font-outfit">
            <div className="relative flex justify-center items-center w-full md:w-1/2 pb-10 md:pb-0">
                <img
                    src="/combinedprojectslogos.png"
                    className="w-full h-full lg:w-auto lg:h-[75%]"
                />
            </div>

            <motion.div
                className="flex flex-col justify-center w-full lg:pl-20 text-white md:w-1/2 text-neutral-800"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    className="text-4xl font-outfit font-semibold mb-4"
                    variants={item}
                >
                    {t("projectsSection.title")}
                </motion.h2>

                <motion.p
                    className="mb-8 text-lg leading-relaxed font-inter"
                    variants={item}
                >
                    {t("projectsSection.description")}
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
                    <button
                        onClick={clickHandler}
                        className="px-6 py-3 text-center font-medium font-outfit rounded-lg bg-primary text-black hover:bg-primary/90 hover:shadow-lg transition"
                    >
                        {t("projectsSection.exploreButton")}
                    </button>
                    <Link
                        to="https://github.com/Raiyader"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center space-x-2 font-medium font-outfit text-neutral-300 hover:text-white transition px-6 py-3 text-center rounded-lg border-2 border-primary text-white hover:bg-primary hover:shadow-lg transition"
                    >
                        <svg role="img" className="w-5 h-5" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        <span className="text-base">GitHub</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
