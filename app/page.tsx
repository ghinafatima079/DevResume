"use client";

import { useState, useEffect } from "react";

import { getSession, saveSession } from "@/services/session";

import { getUserByEmail, upsertUser } from "@/services/user";

import SetUpPanel from "@/components/SetUpPanel";
import ResumeEditor from "@/components/ResumeEditor";
import ResumeView from "@/components/ResumeView";

import { saveResume } from "@/services/resume";
import SavedResumesPanel from "@/components/SavedResumesPanel";

import { useProjects } from "@/hooks/useProjects";
import { useResume } from "@/hooks/useResume";

import { UserProfile } from "@/components/userProfileForm";

export default function Home() {

  // =========================
  // 1. STATE
  // =========================

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<UserProfile>({
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
    }
  });

  const [resumeTitle, setResumeTitle] = useState("");
  const [mounted, setMounted] = useState(false);

  // =========================
  // 2. CUSTOM HOOKS
  // =========================

  const {
    projects,
    loadingProjects,
    error,
    selectedProjects,
    fetchProjects,
    toggleProject,
  } = useProjects(token);

  const {
    editableResumes,
    setEditableResumes,
    sections,
    setSections,
    mode,
    setMode,
    hasGenerated,
    isGenerating,
    handleGenerate,
  } = useResume(projects, selectedProjects, user, setResumeTitle);

  const resetResumeState = () => {
    setEditableResumes([]);
    setSections([]);
    setMode("edit");
  };

  // =========================
  // 3. EFFECTS
  // =========================

  // 3.2 Auto-load user on email input
  useEffect(() => {
    const session = getSession();

    if (session.token && session.token.trim() !== "") {
      setToken(session.token);
    }

    if (session.user) {
      setUser(session.user);
    }
  }, []);

  // 3.3 Auto-fetch projects
  useEffect(() => {
    let hasFetched = false;

    const autoFetch = async () => {
      if (!token || token.trim().length < 20 || hasFetched) return;

      hasFetched = true;

      try {
        await fetchProjects();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    autoFetch();
  }, [token]);

  // 3.4 Save session (token + user)
  useEffect(() => {
    if (token && user.email) {
      saveSession(token, user);
    }
  }, [token, user]);

  // 3.5 Mounted flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================
  // 4. HANDLERS (optional cleanup)
  // =========================

  const handleUserLogin = async () => {
    if (!user.email || user.email.trim().length < 5) return;

    try {
      const email = user.email;

      const existingUser = await getUserByEmail(email);
      console.log("Fetched user:", existingUser);

      if (existingUser && existingUser.email) {
        setUser(existingUser);
      } else {
        const newUser = await upsertUser({ email });
        setUser({
          name: "",
          email,
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
          ...newUser, // optional merge if backend returns more
        });
      }

      setIsUserLoaded(true);
    } catch (err) {
      console.log("User login failed", err);
    }
  };

  const handleFetchProjects = async () => {
    try {
      await fetchProjects();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };
  return (
    <>
      {mode === "edit" && (

        <div className="px-8 py-6 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-16 h-[calc(100vh-80px)]">

            <div id="leftPanel" className="col-span-1 overflow-y-auto pr-2">
              <SetUpPanel
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
                fetchProjects={handleFetchProjects}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                isUserLoaded={isUserLoaded}
                setIsUserLoaded={setIsUserLoaded}
                handleUserLogin={handleUserLogin}
                onResetResume={resetResumeState}
                error={error}
                loadingProjects={loadingProjects}
                projects={projects}
                selectedProjects={selectedProjects}
                toggleProject={toggleProject}
                handleGenerate={handleGenerate}
                mounted={mounted}
              />
            </div>

            <div id="rightPanel" className="col-span-2 overflow-y-auto">

              <div className="col-span-2">

                {!hasGenerated && !isGenerating && (
                  <div className="h-full flex items-center justify-center text-sm text-[#7D8590]">
                    Your resume will appear here →
                  </div>
                )}

                {isGenerating && (
                  <div className="h-full flex items-center justify-center text-sm text-[#7D8590]">
                    Generating resume...
                  </div>
                )}

                {hasGenerated && !isGenerating && (
                  <div className="space-y-6">

                    <ResumeEditor
                      resumes={editableResumes}
                      setResumes={setEditableResumes}
                    />

                    <div className="flex gap-3">

                      <input
                        className="text-sm border border-[#30363D] px-2 py-1 bg-transparent"
                        placeholder="Resume title (e.g. Backend Resume)"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                      />

                      <button
                        disabled={!user?.email}
                        className="text-sm px-3 py-1 border border-[#30363D] hover:bg-[#161B22]"
                        onClick={async () => {
                          try {
                            console.log("Saving:", { user, sections });

                            if (!user?.email) {
                              alert("User email missing");
                              return;
                            }

                            await saveResume({
                              userEmail: user.email,
                              user,
                              sections,
                              title: resumeTitle || user.name,
                            });

                            console.log("Saving resume with:", {
                              userEmail: user.email,
                              user,
                              sections,
                            });

                            alert("Resume saved!");
                          } catch (err) {
                            console.error(err);
                            alert("Failed to save resume");
                          }
                        }}
                      >
                        Save Resume →
                      </button>

                      <button
                        className="text-sm px-3 py-1 border border-[#30363D] hover:bg-[#161B22]"
                        onClick={() => setMode("load")}
                      >
                        Load →
                      </button>

                      <button
                        className="text-sm px-3 py-1 border border-[#30363D] hover:bg-[#161B22]"
                        onClick={() => setMode("view")}
                      >
                        View Resume →
                      </button>

                    </div>

                  </div>

                )}

              </div>
            </div>


          </div>
        </div>

      )}

      {mode === "load" && (
        <div className="px-8 py-6 w-full max-w-5xl mx-auto">

          <button
            className="text-sm text-gray-400 hover:text-white mb-6"
            onClick={() => setMode("edit")}
          >
            ← Back
          </button>

          <SavedResumesPanel
            user={user}
            setSections={setSections}
            setEditableResumes={setEditableResumes}
            setResumeTitle={setResumeTitle}
            setUser={setUser}
            onClose={() => setMode("edit")}
          />

        </div>
      )}

      {mode === "view" && (
        <ResumeView user={user} sections={sections} setMode={setMode} />
      )}
    </>
  );
}