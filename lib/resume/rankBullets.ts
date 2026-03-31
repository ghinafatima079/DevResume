export type Bullet = {
    text: string;
    source: "issue" | "log";
};

export function scoreBullet(bullet: Bullet): number {
    let score = 0;

    const text = bullet.text;
    const lower = text.toLowerCase();

    // 1. Strong technical keywords
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

    // 3. Issue bonus
    if (bullet.source === "issue") {
        score += 1;
    }

    // 4. Low-impact penalty
    const lowImpact = [
        "ui", "css", "button", "alignment", "styling",
        "minor", "small", "basic", "simple", "changed", "updated"
    ];

    if (lowImpact.some(w => lower.includes(w))) {
        score -= 2;
    }

    // 5. Length scoring
    if (text.length > 60 && text.length < 160) {
        score += 2;
    } else if (text.length < 30) {
        score -= 1;
    }

    // 6. Action + tech combo (strong signal)
    const actions = ["implemented", "designed", "built", "optimized", "developed"];
    const tech = ["api", "auth", "database", "backend", "server"];

    if (
        actions.some(a => lower.includes(a)) &&
        tech.some(t => lower.includes(t))
    ) {
        score += 4;
    }

    // 7. Complexity signals
    const complexitySignals = [
        "jwt",
        "token",
        "authentication",
        "authorization",
        "pagination",
        "optimization",
        "performance",
        "scalable",
        "architecture",
        "async",
        "real-time",
    ];

    if (complexitySignals.some(c => lower.includes(c))) {
        score += 3;
    }

    return score;
}

export function rankBullets(bullets: Bullet[]): Bullet[] {
    return bullets
        .map(b => ({
            ...b,
            score: scoreBullet(b)
        }))
        .sort((a, b) => b.score - a.score);
}