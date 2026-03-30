"use client";

import ProjectSelector from "@/components/projectSelector";

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

type Props = {
    user: UserProfile;
    setUser: (user: UserProfile) => void;
};

export default function UserProfileForm({ user, setUser }: Props) {
    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-base font-semibold">Profile</h2>
                <p className="text-sm text-[#7D8590]">Basic personal details</p>
            </div>

            <div className="border-t border-[#30363D]" />

            <div className="space-y-4">

                <div className="grid grid-cols-3 items-center">
                    <label className="text-sm text-[#7D8590]">Name</label>
                    <input
                        className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-3 items-center">
                    <label className="text-sm text-[#7D8590]">Email</label>
                    <input
                        className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-3 items-center">
                    <label className="text-sm text-[#7D8590]">GitHub</label>
                    <input
                        className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        value={user.github}
                        onChange={(e) =>
                            setUser({ ...user, github: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-3 items-center">
                    <label className="text-sm text-[#7D8590]">LinkedIn</label>
                    <input
                        className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        value={user.linkedin}
                        onChange={(e) =>
                            setUser({ ...user, linkedin: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-3 items-center">
                    <label className="text-sm text-[#7D8590]">Mobile</label>
                    <input
                        className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                        value={user.mobile}
                        onChange={(e) =>
                            setUser({ ...user, mobile: e.target.value })
                        }
                    />
                </div>

                <div className="space-y-4">

                    <div className="border-t border-[#30363D]" />

                    <div>
                        <h2 className="text-base font-semibold">Education</h2>
                    </div>

                    <div className="space-y-4">

                        <div className="grid grid-cols-3 items-center">
                            <label className="text-sm text-[#7D8590]">College</label>
                            <input
                                className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                value={user.education?.college || ""}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        education: { ...user.education, college: e.target.value }
                                    })
                                }
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
                                        education: { ...user.education, degree: e.target.value }
                                    })
                                }
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
                                        education: { ...user.education, year: e.target.value }
                                    })
                                }
                            />
                        </div>

                    </div>
                </div>

                <div className="border-t border-[#30363D]" />

                <div>
                    <h2 className="text-base font-semibold">Skills</h2>
                </div>

                <div className="space-y-4">

                    <div className="grid grid-cols-3 items-center">
                        <label className="text-sm text-[#7D8590]">Languages</label>
                        <input
                            className="col-span-2 bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                            value={user.skills?.languages || ""}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    skills: { ...user.skills, languages: e.target.value }
                                })
                            }
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
                                    skills: { ...user.skills, frameworks: e.target.value }
                                })
                            }
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
                                    skills: { ...user.skills, tools: e.target.value }
                                })
                            }
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}