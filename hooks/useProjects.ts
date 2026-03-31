import { useState } from "react";
import { fetchProjectsAPI, fetchProjectDetails } from "@/services/devjournal";

import { saveSession } from "@/services/session";

export function useProjects(token: string) {
    const [projects, setProjects] = useState<any[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

    const fetchProjects = async () => {
        if (!token) return;

        setLoadingProjects(true);
        setError(null);

        try {
            const projectsData = await fetchProjectsAPI(token);

            if (!projectsData || projectsData.length === 0) {
                setProjects([]);
                setError("No projects found in DevJournal.");
                return;
            }

            const enriched = await Promise.all(
                projectsData.map(async (p: any) => {
                    const { logs, issues } = await fetchProjectDetails(p.id, token);

                    return {
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        techStack: p.tech_stack || [],
                        logs,
                        issues,
                    };
                })
            );

            setProjects(enriched);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
            throw err;
        } finally {
            setLoadingProjects(false);
        }
    };

    const toggleProject = (id: number) => {
        setSelectedProjects(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    return {
        projects,
        loadingProjects,
        error,
        selectedProjects,
        fetchProjects,
        toggleProject,
    };
}