"use client";

import { useState, useEffect } from "react";

import SetUpPanel from "@/components/SetUpPanel";
import ResumeEditor from "@/components/ResumeEditor";
import ResumeView from "@/components/ResumeView";

import { useProjects } from "@/hooks/useProjects";
import { useResume } from "@/hooks/useResume";

import UserProfileForm, { UserProfile } from "@/components/userProfileForm";

export default function Home() {

  // USER
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window === "undefined") {
      return { name: "", email: "", github: "", linkedin: "", mobile: "" };
    }

    const saved = localStorage.getItem("devresume_user");
    return saved
      ? JSON.parse(saved)
      : { name: "", email: "", github: "", linkedin: "", mobile: "" };
  });

  useEffect(() => {
    localStorage.setItem("devresume_user", JSON.stringify(user));
  }, [user]);

  // TOKEN
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("devjournal_token") || "";
  });

  useEffect(() => {
    localStorage.setItem("devjournal_token", token);
  }, [token]);

  // PROJECTS HOOK
  const {
    projects,
    loadingProjects,
    error,
    selectedProjects,
    fetchProjects,
    toggleProject,
  } = useProjects(token);

  // RESUME HOOK
  const {
    editableResumes,
    setEditableResumes,
    sections,
    mode,
    setMode,
    hasGenerated,
    isGenerating,
    handleGenerate,
  } = useResume(projects, selectedProjects, user);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mode !== "view" ? (

        <div className="px-8 py-6 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-16">

            <SetUpPanel
              user={user}
              setUser={setUser}
              token={token}
              setToken={setToken}
              fetchProjects={fetchProjects}
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

                  <button
                    className="text-sm px-3 py-1 border border-[#30363D] hover:bg-[#161B22]"
                    onClick={() => setMode("view")}
                  >
                    View Resume →
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

      ) : (
        <ResumeView user={user} sections={sections} setMode={setMode} />
      )}
    </>
  );
}