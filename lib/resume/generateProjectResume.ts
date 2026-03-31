import { generateSummary } from "./generateSummary";
import { generateBullets } from "./generateBullets";
import { generateFeatureBullets } from "./generateFeatures";

import { rankBullets, type Bullet } from "./rankBullets";

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
        .replace(/\.$/, "")
        .replace(/\s+/g, " ")
        .replace(/\b(the|a|an)\b/gi, "")
        .trim();
}

function dedupeBullets(bullets: Bullet[]): Bullet[] {
    const seen: string[] = [];

    return bullets.filter((b) => {
        const key = b.text.toLowerCase();

        for (const existing of seen) {
            if (existing.includes(key) || key.includes(existing)) {
                return false;
            }
        }

        seen.push(key);
        return true;
    });
}

export function generateProjectResume(project: Project): ResumeProject {

    if (
        (!project.logs || project.logs.length === 0) &&
        (!project.issues || project.issues.length === 0)
    ) {
        return {
            name: project.name,
            summary: project.description || "",
            techStack: project.techStack,
            bullets: ["Not enough data to generate strong resume points."]
        };
    }

    const summary = generateSummary(project);

    // raw strings
    const features = generateFeatureBullets(project);
    const technical = generateBullets(project);

    // structure bullets
    const featureBullets: Bullet[] = features.map(b => ({
        text: cleanBullet(b),
        source: "log"
    }));

    const technicalBullets: Bullet[] = technical.map(b => ({
        text: cleanBullet(b),
        source: "issue"
    }));

    // combine
    let allBullets: Bullet[] = [...featureBullets, ...technicalBullets];

    // dedupe (structure preserved)
    allBullets = dedupeBullets(allBullets);

    // rank (single source of truth)
    const ranked = rankBullets(allBullets);

    // take top 4 + convert to string[]
    const topBullets = ranked.slice(0, 4).map(b => b.text);

    return {
        name: project.name,
        summary,
        techStack: project.techStack,
        bullets: topBullets
    };
}