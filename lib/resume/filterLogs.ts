export function filterLogs(logs: string[]): string[] {
  const filtered: string[] = [];

  const weakWords = ["fix", "fixed", "worked", "updated", "minor"];
  const strongKeywords = ["api", "auth", "database", "search", "server"];

  for (const log of logs) {
    const lower = log.toLowerCase();

    const isWeak = weakWords.some(word => lower.includes(word));
    const hasStrong = strongKeywords.some(word => lower.includes(word));

    // keep if:
    // - not weak OR
    // - weak but has strong keyword
    if (!isWeak || hasStrong) {
      filtered.push(log);
    }
  }

  return filtered;
}