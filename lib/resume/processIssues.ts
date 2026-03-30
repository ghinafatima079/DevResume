type Issue = {
  problem?: string | null;
  solution?: string | null;
};

export function processIssues(
  issues: { problem?: string | null; solution?: string | null }[]
): string[] {
  const results: string[] = [];

  for (const issue of issues) {
    if (!issue.problem || !issue.solution) continue;

    let solution = issue.solution.trim();

    // normalize common verbs
    if (solution.startsWith("moved")) {
      solution = "migrating " + solution.slice(6);
    }

    if (solution.startsWith("fixed")) {
      solution = "fixing " + solution.slice(6);
    }

    if (solution.startsWith("updated")) {
      solution = "updating " + solution.slice(8);
    }

    const bullet = `Resolved ${issue.problem} by ${solution}`;

    results.push(capitalize(bullet));
  }

  return results;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}