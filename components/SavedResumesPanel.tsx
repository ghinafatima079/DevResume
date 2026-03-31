import { useEffect, useState } from "react";
import { getResumes } from "@/services/resume";
import { deleteResume } from "@/services/resume";
import { updateResumeTitle } from "@/services/resume";

export default function SavedResumesPanel({
    setSections,
    setEditableResumes,
    setResumeTitle,
    setUser,
    onClose,
}: any) {
    const [savedResumes, setSavedResumes] = useState<any[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempTitle, setTempTitle] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getResumes();
                console.log("Loaded resumes:", data);
                setSavedResumes(data);
            } catch {
                alert("Failed to load resumes");
            }
        };

        load();
    }, []);

    return (
        <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
                <h2 className="text-lg font-medium">Saved Resumes</h2>

                <button
                    className="text-sm text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>

            {/* EMPTY STATE */}
            {savedResumes.length === 0 && (
                <p className="text-sm text-gray-500">
                    No saved resumes yet.
                </p>
            )}

            {/* LIST */}
            <div className="space-y-4">
                {savedResumes.map((r) => (
                    <div
                        key={r.id}
                        className="border border-[#30363D] p-4 flex justify-between items-center hover:bg-[#161B22] transition"
                    >

                        {/* LEFT SIDE */}
                        {editingId === r.id ? (
                            <input
                                className="text-sm border border-[#30363D] px-2 py-1 bg-transparent"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                onBlur={async () => {
                                    try {
                                        await updateResumeTitle(r.id, tempTitle);

                                        setSavedResumes((prev: any[]) =>
                                            prev.map((item) =>
                                                item.id === r.id ? { ...item, title: tempTitle } : item
                                            )
                                        );

                                        setEditingId(null);
                                    } catch {
                                        alert("Failed to update title");
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <p
                                className="text-sm font-medium cursor-pointer hover:underline"
                                onClick={() => {
                                    setEditingId(r.id);
                                    setTempTitle(r.title || "");
                                }}
                            >
                                {r.title || "Untitled Resume"}
                            </p>
                        )}

                        {/* RIGHT SIDE (BUTTONS) */}
                        <div className="flex gap-2">

                            <button
                                className="text-xs px-3 py-1 border border-[#30363D] hover:bg-[#21262D]"
                                onClick={() => {
                                    setSections(r.sections);
                                    setEditableResumes(
                                        r.sections.find((s: any) => s.type === "projects")?.data || []
                                    );
                                    setUser(r.user_data);
                                    setResumeTitle(r.title || "");
                                    onClose();
                                }}
                            >
                                Load
                            </button>

                            <button
                                className="text-xs px-3 py-1 border border-red-500 text-red-400 hover:bg-red-500/10"
                                onClick={async () => {
                                    try {
                                        await deleteResume(r.id);

                                        setSavedResumes((prev: any[]) =>
                                            prev.filter((item) => item.id !== r.id)
                                        );

                                    } catch {
                                        alert("Failed to delete");
                                    }
                                }}
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}