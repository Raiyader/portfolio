import { useTranslation } from "react-i18next";
import type { LocalizedProject } from "../models/projects";
import { projects } from "../models/projects";

export const useLocalizedProjects = (): LocalizedProject[] => {
  const { t } = useTranslation();
  return projects.map((project) => ({
    ...project,
    description: t(`projects.${project.id}.description`)
  }));
};
