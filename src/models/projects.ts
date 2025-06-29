export interface Project {
    id: number;
    title: string;
    techStack: string[];
    extraTech: string[];
    githubUrl: string;
    demoRoute?: string;
    logoUrl: string;
}

export interface LocalizedProject {
    id: number;
    title: string;
    description: string,
    techStack: string[];
    extraTech: string[];
    githubUrl: string;
    demoRoute?: string;
    logoUrl: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Abyssal Shopping",
        techStack: ["JavaScript", "React", "Node", "Mongoose"],
        extraTech: ["Redux", "Router", "JWT", "Express"],
        githubUrl: "abyssal-shopping",
        demoRoute: "/demo/abyssal-shopping",
        logoUrl: "abyssal-shopping"
    },
    {
        id: 2,
        title: "Adventure Log",
        techStack: ["JavaScript", "Next", "MongoDB"],
        extraTech: ["NextAuth"],
        githubUrl: "adventure-log",
        demoRoute: undefined,
        logoUrl: "adventure-log"
    },
    {
        id: 3,
        title: "Abyssal Events",
        techStack: ["Csharp", "dotnet", "SQL"],
        extraTech: ["JWT", "Cloudinary"],
        githubUrl: "abyssal-events",
        demoRoute: undefined,
        logoUrl: "abyssal-events"
    },
    {
        id: 4,
        title: "Fire Kitchen",
        techStack: ["JavaScript", "Csharp", "React", "dotnet", "SQL", "Bootstrap"],
        extraTech: ["Query", "Router", "JWT", "Cloudinary"],
        githubUrl: "fire-kitchen",
        demoRoute: "/demo/fire-kitchen",
        logoUrl: "fire-kitchen"
    },
    {
        id: 5,
        title: "Artikel Boost",
        techStack: ["JavaScript", "Python", "React", "Flask", "Tailwind"],
        extraTech: ["Router"],
        githubUrl: "artikelboost",
        demoRoute: "/demo/artikel-boost",
        logoUrl: "artikel-boost"
    },
    {
        id: 6,
        title: "Portfolio",
        techStack: ["TypeScript", "React", "Tailwind"],
        extraTech: ["Router", "Motion"],
        githubUrl: "portfolio",
        demoRoute: undefined,
        logoUrl: "portfolio"
    }
]
