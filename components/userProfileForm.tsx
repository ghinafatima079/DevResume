"use client";

import { upsertUser } from "@/services/user";

export type UserProfile = {
    name: string;
    email: string;
    github: string;
    linkedin: string;
    mobile: string;

    education: {
        college: string;
        degree: string;
        year: string;
    };

    skills: {
        languages: string;
        frameworks: string;
        tools: string;
    };
};

export default function UserProfileForm({
    user,
    setUser,
    isUserLoaded,
    onContinue,
    onChangeEmail,
}: any) {
    return (
        <div className="space-y-6">

            {/* EMAIL LOGIN STEP */}
            {!isUserLoaded && (
                <div className="space-y-3">
                    <label className="text-sm text-[#7D8590]">
                        Enter your email
                    </label>

                    <input
                        className="w-full bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        placeholder="your@email.com"
                        value={user.email || ""}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        disabled={isUserLoaded}
                    />

                    <button
                        className="text-sm px-3 py-1 border border-[#30363D] hover:bg-[#161B22]"
                        onClick={onContinue}
                        disabled={!user.email || user.email.length < 5}
                    >
                        Continue →
                    </button>
                </div>
            )}

            {/* FULL PROFILE FORM */}
            {isUserLoaded && (
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-base font-semibold">Profile</h2>
                            <p className="text-sm text-[#7D8590]">
                                Logged in as {user.email}
                            </p>
                        </div>

                        <button
                            className="text-xs text-red-400"
                            onClick={onChangeEmail}
                        >
                            Change
                        </button>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold">Profile</h2>
                        <p className="text-sm text-[#7D8590]">
                            Basic personal details
                        </p>
                    </div>

                    <div className="border-t border-[#30363D]" />

                    {/* BASIC INFO */}
                    <div className="space-y-4">

                        <div className="grid grid-cols-3 items-center">
                            <label className="text-sm text-[#7D8590]">Name</label>
                            <input
                                className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                value={user.name || ""}
                                onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                }
                                onBlur={async () => {
                                    if (user.email) {
                                        await upsertUser(user);
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-3 items-center">
                            <label className="text-sm text-[#7D8590]">GitHub</label>
                            <input
                                className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                value={user.github || ""}
                                onChange={(e) =>
                                    setUser({ ...user, github: e.target.value })
                                }
                                onBlur={async () => {
                                    if (user.email) {
                                        await upsertUser(user);
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-3 items-center">
                            <label className="text-sm text-[#7D8590]">LinkedIn</label>
                            <input
                                className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                value={user.linkedin || ""}
                                onChange={(e) =>
                                    setUser({ ...user, linkedin: e.target.value })
                                }
                                onBlur={async () => {
                                    if (user.email) {
                                        await upsertUser(user);
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-3 items-center">
                            <label className="text-sm text-[#7D8590]">Mobile</label>
                            <input
                                className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                value={user.mobile || ""}
                                onChange={(e) =>
                                    setUser({ ...user, mobile: e.target.value })
                                }
                                onBlur={async () => {
                                    if (user.email) {
                                        await upsertUser(user);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <details>
                        <summary className="cursor-pointer text-sm text-[#7D8590]">
                            Education
                        </summary>

                        <div className="mt-2 space-y-4">

                            <div className="grid grid-cols-3 items-center">
                                <label className="text-sm text-[#7D8590]">College</label>
                                <input
                                    className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={user.education?.college || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            education: {
                                                ...user.education,
                                                college: e.target.value,
                                            },
                                        })
                                    }
                                    onBlur={async () => {
                                        if (user.email) {
                                            await upsertUser(user);
                                        }
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-3 items-center">
                                <label className="text-sm text-[#7D8590]">Degree</label>
                                <input
                                    className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={user.education?.degree || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            education: {
                                                ...user.education,
                                                degree: e.target.value,
                                            },
                                        })
                                    }
                                    onBlur={async () => {
                                        if (user.email) {
                                            await upsertUser(user);
                                        }
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-3 items-center">
                                <label className="text-sm text-[#7D8590]">Year</label>
                                <input
                                    className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={user.education?.year || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            education: {
                                                ...user.education,
                                                year: e.target.value,
                                            },
                                        })
                                    }
                                    onBlur={async () => {
                                        if (user.email) {
                                            await upsertUser(user);
                                        }
                                    }}
                                />
                            </div>

                        </div>
                    </details>

                    {/* SKILLS */}
                    <details>
                        <summary className="cursor-pointer text-sm text-[#7D8590]">
                            Skills
                        </summary>

                        <div className="mt-2 space-y-4">

                            <div className="grid grid-cols-3 items-center">
                                <label className="text-sm text-[#7D8590]">Languages</label>
                                <input
                                    className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={user.skills?.languages || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            skills: {
                                                ...user.skills,
                                                languages: e.target.value,
                                            },
                                        })
                                    }
                                    onBlur={async () => {
                                        if (user.email) {
                                            await upsertUser(user);
                                        }
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-3 items-center">
                                <label className="text-sm text-[#7D8590]">Frameworks</label>
                                <input
                                    className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={user.skills?.frameworks || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            skills: {
                                                ...user.skills,
                                                frameworks: e.target.value,
                                            },
                                        })
                                    }
                                    onBlur={async () => {
                                        if (user.email) {
                                            await upsertUser(user);
                                        }
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-3 items-center">
                                <label className="text-sm text-[#7D8590]">Tools</label>
                                <input
                                    className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                    value={user.skills?.tools || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            skills: {
                                                ...user.skills,
                                                tools: e.target.value,
                                            },
                                        })
                                    }
                                    onBlur={async () => {
                                        if (user.email) {
                                            await upsertUser(user);
                                        }
                                    }}
                                />
                            </div>

                        </div>
                    </details>
                </>
            )}
        </div>
    );
}