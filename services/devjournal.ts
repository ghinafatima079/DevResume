export const fetchProjectsAPI = async (token: string) => {
    const res = await fetch(
        "https://devjournal-v2.onrender.com/projects",
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    if (res.status === 401) {
        throw new Error("Invalid token. Please login again.");
    }

    if (!res.ok) {
        throw new Error("Failed to fetch projects.");
    }

    return res.json();
};

export const fetchProjectDetails = async (id: number, token: string) => {
    const [logsRes, issuesRes] = await Promise.all([
        fetch(`https://devjournal-v2.onrender.com/projects/${id}/logs`, {
            headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`https://devjournal-v2.onrender.com/projects/${id}/issues`, {
            headers: { Authorization: `Bearer ${token}` },
        }),
    ]);

    const logs = logsRes.ok ? await logsRes.json() : [];
    const issues = issuesRes.ok ? await issuesRes.json() : [];

    return { logs, issues };
};