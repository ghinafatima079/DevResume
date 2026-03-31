const BASE_URL = "http://127.0.0.1:8000";

export const upsertUser = async (user: any) => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!res.ok) {
        throw new Error("Failed to save user");
    }

    return res.json();
};

export const getUserByEmail = async (email: string) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${email}`);

        if (res.status === 404) return null;

        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};