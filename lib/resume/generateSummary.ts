import type { Project } from "./generateProjectResume";

export function generateSummary(project: Project): string {
    if (!project.description) return "";

    const name = project.name;
    const description = project.description.toLowerCase();
    const tech = project.techStack?.join(", ") || "";

    // Step 1: Base sentence
    let summary = `Developed ${name}, a ${description}`;

    // Step 2: Add tech stack
    if (project.techStack.length > 0) {
        summary += ` using ${tech}`;
    }

    // Step 3: Add purpose (simple heuristic)
    if (description.includes("track") || description.includes("manage")) {
        summary += " to streamline development workflows";
    }

    // Step 4: Final formatting
    summary = capitalize(summary);

    if (!summary.endsWith(".")) {
        summary += ".";
    }

    return summary;
}

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}