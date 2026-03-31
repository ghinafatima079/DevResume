import UserProfileForm from "@/components/userProfileForm";
import ProjectSelector from "@/components/projectSelector";
import { clearSession } from "@/services/session";

export default function SetUpPanel({
    user,
    setUser,
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    isUserLoaded,
    setIsUserLoaded,
    handleUserLogin,
    onResetResume,
    error,
    loadingProjects,
    projects,
    selectedProjects,
    toggleProject,
    handleGenerate,
}: any) {

    const handleChangeEmail = () => {
        setIsUserLoaded(false);

        setUser({
            name: "",
            email: "",
            github: "",
            linkedin: "",
            mobile: "",
            education: {
                college: "",
                degree: "",
                year: "",
            },
            skills: {
                languages: "",
                frameworks: "",
                tools: "",
            },
        });

        setToken("");
        setIsAuthenticated(false);
        clearSession();
        onResetResume();
    };

    return (
        <div className="col-span-1 space-y-10">

            {/* USER PROFILE */}
            <UserProfileForm
                user={user}
                setUser={setUser}
                isUserLoaded={isUserLoaded}
                onContinue={handleUserLogin}
                onChangeEmail={handleChangeEmail}
            />

            {/* EVERYTHING BELOW ONLY AFTER LOGIN */}
            {isUserLoaded && (
                <>
                    {/* DEVJOURNAL TOKEN */}
                    <div className="space-y-2">
                        <label className="text-sm text-[#7D8590]">
                            DevJournal Token
                        </label>

                        {!isAuthenticated && (
                            <input
                                className="w-full bg-transparent border-b border-[#30363D] py-1 text-sm focus:outline-none"
                                placeholder="Paste your DevJournal token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        )}

                        {isAuthenticated && (
                            <div>
                                <p className="text-sm text-green-500">
                                    Connected to DevJournal
                                </p>

                                <button
                                    className="text-xs text-red-400"
                                    onClick={() => {
                                        clearSession();
                                        setToken("");
                                        setIsAuthenticated(false);
                                    }}
                                >
                                    Disconnect
                                </button>
                            </div>
                        )}

                        {error && (
                            <p className="text-sm text-red-400">{error}</p>
                        )}
                    </div>

                    {/* LOADING */}
                    {loadingProjects && projects.length === 0 && (
                        <p className="text-sm">Loading projects...</p>
                    )}

                    {/* PROJECT SELECTOR */}
                    <ProjectSelector
                        projects={projects}
                        selectedProjects={selectedProjects}
                        toggleProject={toggleProject}
                    />

                    {/* GENERATE */}
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
                </>
            )}
        </div>
    );
}