import type { Project } from "./generateProjectResume";

export function generateFeatureBullets(project: Project): string[] {
    const features: string[] = [];
    const tech = project.techStack.join(", ").toLowerCase();

    if (tech.includes("fastapi") || tech.includes("node")) {
        features.push("Designed and implemented RESTful API architecture");
    }

    if (tech.includes("postgres") || tech.includes("database")) {
        features.push("Designed relational database schema for efficient data management");
    }

    if (tech.includes("jwt") || tech.includes("auth")) {
        features.push("Implemented secure authentication and authorization system");
    }

    return features;
}