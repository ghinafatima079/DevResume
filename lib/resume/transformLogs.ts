export function transformLogs(logs: string[]): string[] {
  const results: string[] = [];

  const verbMap: Record<string, string> = {
    added: "Added",
    created: "Created",
    built: "Built",
    fixed: "Resolved",
    implemented: "Implemented",
    designed: "Designed",
  };

  const keywordMap: Record<string, string> = {
    "search bar": "search functionality",
    auth: "authentication system",
    authentication: "authentication system",
    api: "RESTful API",
    db: "database",
    database: "database system"
  };

  // sort once (outside loop)
  const keys = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

  for (const log of logs) {
    let text = log.toLowerCase();

    // 1. Replace verb (first word only)
    const words = text.split(" ");
    if (verbMap[words[0]]) {
      words[0] = verbMap[words[0]];
    }
    text = words.join(" ");

    // 2. Replace keywords
    for (const key of keys) {
      if (text.includes(key)) {
        const replacement = keywordMap[key];

        // prevent duplication
        if (!text.includes(replacement)) {
          text = text.replace(key, replacement);
          text = text.replace(/\b(\w+)\s+\1\b/g, "$1"); // remove duplicates
        }
      }
    }

    // 3. Capitalize
    text = text.charAt(0).toUpperCase() + text.slice(1);

    text = text
      .replace(/\.$/, "")        // remove trailing dot
      .replace(/\s+/g, " ")      // normalize spaces
      .trim();

    results.push(text);
  }

  return results;
}