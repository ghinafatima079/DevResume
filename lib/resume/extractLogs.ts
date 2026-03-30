type Log = {
  title: string;
  content?: string | null;
};

export function extractLogs(logs: Log[]): string[] {
  const results: string[] = [];

  for (const log of logs) {
    if (log.content) {
      results.push(`${log.title} ${log.content}`);
    } else {
      results.push(log.title);
    }
  }

  return results;
}