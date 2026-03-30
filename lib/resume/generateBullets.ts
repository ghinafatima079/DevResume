import type { Project } from "./generateProjectResume";

import { extractLogs } from "./extractLogs";
import { filterLogs } from "./filterLogs";
import { transformLogs } from "./transformLogs";
import { processIssues } from "./processIssues";

import { rankBullets } from "./rankBullets";

export function generateBullets(project: Project): string[] {
    // Logs pipeline
    const extractedLogs = extractLogs(project.logs);
    const filteredLogs = filterLogs(extractedLogs);
    const transformedLogs = transformLogs(filteredLogs);

    // Issues
    const issueBullets = processIssues(project.issues);

    // Combine (issues first)
    let bullets = [
        ...issueBullets.map(text => ({ text, source: "issue" as const })),
        ...transformedLogs.map(text => ({ text, source: "log" as const }))
    ];

    console.log("COMBINED:", bullets);

    // remove duplicates BEFORE ranking
    const seen = new Set<string>();

    const unique = bullets.filter(b => {
        if (seen.has(b.text)) return false;
        seen.add(b.text);
        return true;
    });

    console.log("UNIQUE:", unique);

    // rank
    const ranked = rankBullets(unique);

    console.log("RANKED:", ranked);

    // limit
    console.log("FINAL (TOP 4):", ranked.slice(0, 4));
    return ranked.slice(0, 4);

}