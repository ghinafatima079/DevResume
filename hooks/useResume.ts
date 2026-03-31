import { useState } from "react";
import { generateProjectResume } from "@/lib/resume/generateProjectResume";

export function useResume(
    projects: any[],
    selectedProjects: number[],
    user: any,
    setResumeTitle: (title: string) => void
) {
    const [editableResumes, setEditableResumes] = useState<any[]>([]);
    const [sections, setSections] = useState<any[]>([]);
    const [mode, setMode] = useState<"edit" | "view" | "load">("edit");
    const [hasGenerated, setHasGenerated] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);

        const activeProjects = projects.filter(p =>
            selectedProjects.includes(p.id)
        );

        const generated = activeProjects.map(p =>
            generateProjectResume(p)
        );

        setTimeout(() => {
            setEditableResumes(generated);

            setSections([
                { type: "education", data: user.education },
                { type: "projects", data: generated },
                { type: "skills", data: user.skills },
            ]);

            setResumeTitle("");
            setIsGenerating(false);
            setHasGenerated(true);
        }, 500);
    };

    return {
        editableResumes,
        setEditableResumes,
        sections,
        setSections,
        mode,
        setMode,
        hasGenerated,
        isGenerating,
        handleGenerate,
    };
}