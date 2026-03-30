import UserProfileForm from "@/components/userProfileForm";
import ProjectSelector from "@/components/projectSelector";

export default function SetUpPanel({
    user,
    setUser,
    token,
    setToken,
    fetchProjects,
    error,
    loadingProjects,
    projects,
    selectedProjects,
    toggleProject,
    handleGenerate,
    mounted,
}: any) {
    return (
        <div className="col-span-1 space-y-10">

            <UserProfileForm user={user} setUser={setUser} />

            <div className="space-y-2">
                <label className="text-sm text-[#7D8590]">
                    DevJournal Token
                </label>

                <input
                    className="w-full bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                    placeholder="Paste your DevJournal token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />

                <button
                    disabled={!mounted || !token}
                    className={`text-sm px-3 py-1 border border-[#30363D] ${!mounted || !token
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-[#161B22]"
                        }`}
                    onClick={fetchProjects}
                >
                    Extract Projects →
                </button>

                {error && (
                    <p className="text-sm text-red-400">{error}</p>
                )}
            </div>

            {loadingProjects && (
                <p className="text-sm">Loading projects...</p>
            )}

            <ProjectSelector
                projects={projects}
                selectedProjects={selectedProjects}
                toggleProject={toggleProject}
            />

            <button
                disabled={projects.length === 0}
                className={`text-sm px-3 py-1 border border-[#30363D] ${projects.length === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#161B22]"
                    }`}
                onClick={handleGenerate}
            >
                Generate →
            </button>

        </div>
    );
}