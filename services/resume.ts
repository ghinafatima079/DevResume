const BASE_URL = "http://127.0.0.1:8000";

export const saveResume = async (data: any) => {
    const res = await fetch(`${BASE_URL}/resumes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: null, // future
            title: data.title,
            user_data: data.user,
            sections: data.sections,
        }),
    });

    if (!res.ok) throw new Error("Failed to save resume");

    return res.json();
};

export const getResumes = async () => {
    const res = await fetch(`${BASE_URL}/resumes`);

    if (!res.ok) throw new Error("Failed to fetch resumes");

    return res.json();
};

export const deleteResume = async (id: number) => {
    const res = await fetch(`${BASE_URL}/resumes/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");

    return res.json();
};

export const updateResumeTitle = async (id: number, title: string) => {
    const res = await fetch(`${BASE_URL}/resumes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Failed to update title");

    return res.json();
};