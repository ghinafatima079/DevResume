"use client";

import { useState, useEffect } from "react";

import { getSession, saveSession } from "@/services/session";

import SetUpPanel from "@/components/SetUpPanel";
import ResumeEditor from "@/components/ResumeEditor";
import ResumeView from "@/components/ResumeView";

import { saveResume } from "@/services/resume";
import SavedResumesPanel from "@/components/SavedResumesPanel";

import { useProjects } from "@/hooks/useProjects";
import { useResume } from "@/hooks/useResume";

import { UserProfile } from "@/components/userProfileForm";

import { deleteResume } from "@/services/resume";

export default function Home() {

  // =========================
  // 1. STATE
  // =========================

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

  // =========================
  // 3. EFFECTS
  // =========================

  // 🔹 3.1 Restore session
  useEffect(() => {
    const session = getSession();

    if (session.token && session.token.trim() !== "") {
      setToken(session.token);
    }

    if (session.user) {
      setUser(session.user);
    }
  }, []);

  // 🔹 3.2 Auto-fetch projects
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

  // 🔹 3.3 Save session (token + user)
  useEffect(() => {
    if (token && user.email) {
      saveSession(token, user);
    }
  }, [token, user]);

  // 🔹 3.4 Save user independently
  useEffect(() => {
    localStorage.setItem("devresume_user", JSON.stringify(user));
  }, [user]);

  // 🔹 3.5 Mounted flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================
  // 4. HANDLERS (optional cleanup)
  // =========================

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
          <div className="grid grid-cols-3 gap-16">

            <SetUpPanel
              user={user}
              setUser={setUser}
              token={token}
              setToken={setToken}
              fetchProjects={handleFetchProjects}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              error={error}
              loadingProjects={loadingProjects}
              projects={projects}
              selectedProjects={selectedProjects}
              toggleProject={toggleProject}
              handleGenerate={handleGenerate}
              mounted={mounted}
            />

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
                      className="text-sm px-3 py-1 border border-[#30363D] hover:bg-[#161B22]"
                      onClick={async () => {
                        try {
                          console.log("Saving:", { user, sections });

                          const res = await saveResume({ user, sections, title: resumeTitle || user.name, });

                          console.log("Saved response:", res);

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