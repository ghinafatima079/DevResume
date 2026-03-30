type Bullet = {
    text: string;
    source: "issue" | "log";
};

export function scoreBullet(bullet: Bullet): number {
    let score = 0;

    const text = bullet.text;
    const lower = text.toLowerCase();

    // 1. Strong technical keywords (VERY IMPORTANT)
    const strongKeywords = ["api", "auth", "database", "backend", "server"];
    if (strongKeywords.some(k => lower.includes(k))) {
        score += 4;
    }

    // 2. Action verbs
    if (
        lower.startsWith("implemented") ||
        lower.startsWith("developed") ||
        lower.startsWith("resolved")
    ) {
        score += 2;
    }

    // 3. Issue bonus (reduced weight)
    if (bullet.source === "issue") {
        score += 1;   // ↓ reduced from 3
    }

    // 4. Impact detection (NEW)
    const lowImpact = ["ui", "css", "button", "alignment", "styling"];

    if (lowImpact.some(w => lower.includes(w))) {
        score -= 2;
    }

    // 5. Length sanity
    if (text.length > 40 && text.length < 120) {
        score += 1;
    }

    return score;
}

export function rankBullets(bullets: Bullet[]): string[] {
    return bullets
        .map(b => ({
            ...b,
            score: scoreBullet(b)
        }))
        .sort((a, b) => b.score - a.score)
        .map(b => b.text);
}