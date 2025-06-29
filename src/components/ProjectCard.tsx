import React from 'react';
import { Link } from 'react-router-dom';
import type { LocalizedProject } from '../models/projects';
import { techIcons } from '../util/techIcons';
import { useDemoTransition } from '../util/demoTransition';

export const ProjectCard: React.FC<{ project: LocalizedProject }> = ({ project }) => {
  const { triggerDemoTransition } = useDemoTransition();

  const clickHandler = (route: string) => {
    const logo = route.split("/")[2];
    triggerDemoTransition(`/logos/${logo}.png`, route);
  };

  return (
    <div className="mb-2 flex flex-col bg-neutral-400 sm:flex-row items-center gap-4 p-4 w-[95%] lg:w-[75%] mx-auto rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex flex-col items-center w-full sm:w-1/4">
        <img
          src={`/logos/${project.logoUrl}.png`}
          alt={`${project.title} Logo`}
          className="w-60 h-60 object-contain mb-2"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {project.techStack.map((tech) => (
            <img
              key={tech}
              src={techIcons[tech]}
              alt={tech}
              className="w-8 h-8"
              title={tech}
            />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-outfit font-semibold">{project.title}</h2>
        <p className="text-sm font-inter text-neutral-900 mt-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.extraTech.length > 0 &&
            project.extraTech?.map((tech) => (
              <img
                key={tech}
                src={techIcons[tech]}
                className="h-6 w-auto rounded"
                title={tech}
              />
            ))}
        </div>
        <div className="mt-4 flex gap-4 justify-start">
          {project.githubUrl && (
            <Link
              to={`https://github.com/Raiyader/${project.githubUrl}`}
              target="_blank"
              className="flex items-center space-x-1 p-1 rounded border-2 border-white bg-white hover:bg-neutral-100 hover:border-neutral-100"
            >
              <svg role="img" className="w-5 h-5" fill="#181717" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              <span className="text-[#181717] font-outfit font-medium">
                GitHub
              </span>
            </Link>
          )}
          {project.demoRoute && (
            <button
              onClick={clickHandler.bind(null, project.demoRoute)}
              className="px-4 py-2 rounded text-black font-medium bg-gradient-to-r from-green-500 to-primary hover:from-teal-500 hover:to-primary transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
