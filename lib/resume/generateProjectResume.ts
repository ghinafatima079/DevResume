import { generateSummary } from "./generateSummary";
import { generateBullets } from "./generateBullets";
import { generateFeatureBullets } from "./generateFeatures";

export type Project = {
    name: string;
    description?: string | null;
    techStack: string[];
    logs: { title: string; content?: string | null }[];
    issues: { problem?: string | null; solution?: string | null }[];
};

export type ResumeProject = {
    name: string;
    summary: string;
    techStack: string[];
    bullets: string[];
};

function cleanBullet(text: string): string {
    return text
        .replace(/\.$/, "")           // remove trailing dot
        .replace(/\s+/g, " ")         // normalize spaces
        .replace(/\b(the|a|an)\b/gi, "") // remove filler words
        .trim();
}

function dedupeBullets(bullets: string[]): string[] {
    const seen = new Set<string>();

    return bullets.filter((b) => {
        const key = b.toLowerCase();

        for (const existing of seen) {
            // remove similar bullets (not just exact)
            if (existing.includes(key) || key.includes(existing)) {
                return false;
            }
        }

        seen.add(key);
        return true;
    });
}

export function generateProjectResume(project: Project): ResumeProject {

    if ((!project.logs || project.logs.length === 0) &&
        (!project.issues || project.issues.length === 0)) {
        return {
            ...project,
            bullets: ["Not enough data to generate strong resume points."],
            summary: project.description || "",
        };
    }

    const summary = generateSummary(project);

    const features = generateFeatureBullets(project);
    const technical = generateBullets(project);

    // combine first then clean to preserve source info for ranking
    let allBullets = [...features, ...technical].map(cleanBullet);

    // remove duplicates
    allBullets = dedupeBullets(allBullets);

    // limit AFTER combining
    allBullets = allBullets.slice(0, 4);

    return {
        name: project.name,
        summary,
        techStack: project.techStack,
        bullets: allBullets
    };
}