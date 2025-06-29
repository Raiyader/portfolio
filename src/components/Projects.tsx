import React from "react";
import { useTranslation } from "react-i18next";
import { ProjectCard } from "./ProjectCard";
import { useLocalizedProjects } from "../util/useLocalizedProjects";

const Projects: React.FC = () => {
    const { t } = useTranslation();
    const projects = useLocalizedProjects()

    return (
        <div className="container pt-[80px] mx-auto mt-10">
            <h1 className="text-3xl font-bold font-outfit text-white text-center mb-4">
                {t("projectsTitle")}
            </h1>
            <p className="text-neutral-300 leading-relaxed font-inter text-justify max-w-4xl mx-auto mb-10 px-6 lg:px-0">
                {t("projectsIntro")}
            </p>

            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                />
            ))}
        </div>
    );
};

export default Projects;
