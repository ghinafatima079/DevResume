import React from "react";

export default function ResumeView({
    user,
    sections,
    setMode,
}: any) {

    const orderedSections = [
        sections.find((s: any) => s.type === "education"),
        sections.find((s: any) => s.type === "projects"),
        sections.find((s: any) => s.type === "experience"),
        sections.find((s: any) => s.type === "skills"),
    ].filter(Boolean);

    const handleDownloadPDF = async () => {
        const element = document.getElementById("resume-content");
        if (!element) return;

        const html2pdf = (await import("html2pdf.js")).default;

        html2pdf().from(element).save();
    };

    return (
        <div className="bg-gray-200 py-10 overflow-auto">
            // VIEW MODE (PDF STYLE)
            <div className="bg-gray-200 py-10 overflow-auto">

                {/* TOP BAR (NOT SCALED) */}
                <div className="max-w-3xl mx-auto flex justify-between items-center mb-4 px-4">
                    <button
                        className="text-xs text-gray-500"
                        onClick={() => setMode("edit")}
                    >
                        ← Back to Edit
                    </button>

                    <button
                        className="text-xs border px-2 py-1 bg-white rounded hover:bg-gray-100 text-gray-700"
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                </div>

                {/* CENTERING + SCALING */}
                <div className="flex justify-center items-start">
                    <div className="origin-top scale-[0.9] md:scale-[1]">

                        <div
                            id="resume-content"
                            className="w-[794px] min-h-[1123px] bg-white text-black p-12 shadow-sm space-y-6 text-[15px] leading-relaxed"
                        >

                            {/* HEADER */}
                            <div className="text-center space-y-1">
                                <h1 className="text-2xl font-semibold">{user.name}</h1>
                                <p className="text-sm text-gray-700">
                                    {user.email} • {user.github} • {user.linkedin} • {user.mobile}
                                </p>
                            </div>

                            <hr />

                            {orderedSections.map((section, index) => {

                                if (section.type === "education") {
                                    return (
                                        <React.Fragment key={section.type}>
                                            <div key={index} className="mt-2 ml-2 space-y-3">
                                                <div className="space-y-1">
                                                    <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-800">
                                                        EDUCATION
                                                    </h2>
                                                    <div className="ml-1">
                                                        <p className="font-medium">{section.data?.degree}</p>
                                                        <p>{section.data?.college}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {section.data?.year}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    );
                                }

                                if (section.type === "projects") {
                                    return (
                                        <React.Fragment key={section.type}>
                                            <div key={index} className="mt-2 ml-2 space-y-3">
                                                <div className="space-y-4">

                                                    <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-800">
                                                        PROJECTS
                                                    </h2>

                                                    {section.data.map((r: any, i: number) => (
                                                        <div key={i} className="ml-1 space-y-1.5 break-inside-avoid">

                                                            {/* PROJECT TITLE */}
                                                            <h3 className="text-[16px] font-medium text-gray-900">
                                                                {r.name}
                                                            </h3>

                                                            {/* TECH STACK */}
                                                            {r.techStack?.length > 0 && (
                                                                <p className="text-xs text-gray-500">
                                                                    {r.techStack.join(", ")}
                                                                </p>
                                                            )}

                                                            {/* SUMMARY */}
                                                            {r.summary && (
                                                                <p className="text-sm leading-relaxed">
                                                                    {r.summary}
                                                                </p>
                                                            )}

                                                            {/* BULLETS */}
                                                            <div className="space-y-1 mt-1">
                                                                {r.bullets.map((b: string, j: number) => (
                                                                    <div key={j} className="flex items-start gap-2">
                                                                        <div className="flex items-baseline gap-2">
                                                                            <span className="text-[14px] leading-none">•</span>
                                                                            <p className="text-[15px] leading-relaxed">{b}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    );
                                }

                                if (section.type === "skills") {
                                    return (
                                        <div key={index} className="mt-2 ml-2 space-y-3">
                                            <div className="space-y-1">
                                                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-800">
                                                    SKILLS
                                                </h2>

                                                {section.data?.languages && (
                                                    <p className="ml-1">
                                                        <span className="font-medium">Languages:</span>{" "}
                                                        {section.data.languages
                                                            ?.split(",")
                                                            .map((s: string) =>
                                                                s.trim().charAt(0).toUpperCase() + s.trim().slice(1)
                                                            )
                                                            .join(", ")}
                                                    </p>
                                                )}

                                                {section.data?.frameworks && (
                                                    <p className="ml-1">
                                                        <span className="font-medium">Frameworks:</span>{" "}
                                                        {section.data.frameworks
                                                            ?.split(",")
                                                            .map((s: string) =>
                                                                s.trim().charAt(0).toUpperCase() + s.trim().slice(1)
                                                            )
                                                            .join(", ")}
                                                    </p>
                                                )}

                                                {section.data?.tools && (
                                                    <p className="ml-1">
                                                        <span className="font-medium">Tools:</span>{" "}
                                                        {section.data.tools
                                                            ?.split(",")
                                                            .map((s: string) =>
                                                                s.trim().charAt(0).toUpperCase() + s.trim().slice(1)
                                                            )
                                                            .join(", ")}
                                                    </p>
                                                )}

                                            </div>
                                        </div>
                                    );
                                }

                                if (section.type === "experience") {
                                    return (
                                        <div key={index} className="mt-2 ml-2 space-y-3">
                                            <div className="space-y-4">

                                                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-800">
                                                    EXPERIENCE
                                                </h2>

                                                {section.data.map((exp: any, i: number) => (
                                                    <div key={i} className="space-y-1 break-inside-avoid">

                                                        <div className="flex justify-between">
                                                            <span className="font-medium">{exp.role}</span>
                                                            <span className="text-sm text-gray-600">
                                                                {exp.duration}
                                                            </span>
                                                        </div>

                                                        <p>{exp.company}</p>

                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {exp.bullets.map((b: string, j: number) => (
                                                                <li key={j}>{b}</li>
                                                            ))}
                                                        </ul>

                                                    </div>
                                                ))}

                                            </div>

                                            <hr />

                                        </div>
                                    );
                                }

                                return null;
                            })}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}