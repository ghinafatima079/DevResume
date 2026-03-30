"use client";

type Props = {
    resumes: any[];
    setResumes: (resumes: any[]) => void;
};

export default function ResumeEditor({ resumes, setResumes }: Props) {

    const updateSummary = (index: number, value: string) => {
        const updated = [...resumes];
        updated[index].summary = value;
        setResumes(updated);
    };

    const updateBullet = (pIndex: number, bIndex: number, value: string) => {
        const updated = [...resumes];
        updated[pIndex].bullets[bIndex] = value;
        setResumes(updated);
    };

    const deleteBullet = (pIndex: number, bIndex: number) => {
        const updated = [...resumes];
        updated[pIndex].bullets = updated[pIndex].bullets.filter(
            (_: string, i: number) => i !== bIndex
        );
        setResumes(updated);
    };

    const addBullet = (pIndex: number) => {
        const updated = [...resumes];
        updated[pIndex].bullets.push("");
        setResumes(updated);
    };

    const moveBullet = (pIndex: number, bIndex: number, dir: "up" | "down") => {
        const updated = [...resumes];
        const bullets = updated[pIndex].bullets;

        const newIndex = dir === "up" ? bIndex - 1 : bIndex + 1;
        if (newIndex < 0 || newIndex >= bullets.length) return;

        [bullets[bIndex], bullets[newIndex]] = [bullets[newIndex], bullets[bIndex]];
        setResumes(updated);
    };

    return (
        <div className="space-y-10">

            {resumes.map((r, i) => (
                <div key={i} className="space-y-4">

                    {/* PROJECT HEADER */}
                    <div>
                        <h2 className="text-base font-semibold">{r.name}</h2>
                        <p className="text-xs text-[#7D8590]">
                            {r.techStack?.join(", ")}
                        </p>
                    </div>

                    {/* SUMMARY */}
                    <textarea
                        className="w-full bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        value={r.summary}
                        placeholder="Write a short, impactful summary of this project..."
                        onChange={(e) => updateSummary(i, e.target.value)}
                    />

                    {/* BULLETS */}
                    <div className="space-y-2">
                        {r.bullets.map((b: string, j: number) => (
                            <div key={j} className="flex items-start gap-2">

                                <span className="text-[#7D8590] mt-1">•</span>

                                <input
                                    className="flex-1 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={b}
                                    onChange={(e) => updateBullet(i, j, e.target.value)}
                                />

                                <div className="flex gap-2 text-xs text-[#7D8590]">

                                    <button onClick={() => moveBullet(i, j, "up")}>
                                        ↑
                                    </button>

                                    <button onClick={() => moveBullet(i, j, "down")}>
                                        ↓
                                    </button>

                                    <button onClick={() => deleteBullet(i, j)}>
                                        delete
                                    </button>

                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ADD BULLET */}
                    <button
                        className="text-xs text-[#7D8590] hover:text-white"
                        onClick={() => addBullet(i)}
                    >
                        + add bullet
                    </button>

                    {/* DIVIDER */}
                    <div className="border-t border-[#30363D]" />

                </div>
            ))}

        </div>
    );
}