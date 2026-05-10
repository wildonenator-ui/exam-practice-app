export interface QuestionResult {
  questionId: string;
  correct: boolean;
  timestamp: number;
  category: string;
  year?: string;
  subject?: string;
}

const STORAGE_KEY = "exam-practice-history";

export function saveResult(result: QuestionResult): void {
  const history = getHistory();
  history.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-2000)));
}

export function getHistory(): QuestionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuestionResult[]) : [];
  } catch {
    return [];
  }
}

export function getCategoryStats(): Record<string, { correct: number; total: number }> {
  const history = getHistory();
  const stats: Record<string, { correct: number; total: number }> = {};
  for (const result of history) {
    if (!stats[result.category]) {
      stats[result.category] = { correct: 0, total: 0 };
    }
    stats[result.category].total++;
    if (result.correct) stats[result.category].correct++;
  }
  return stats;
}

// Returns the most recent result per question for a given year+subject
export function getLatestYearResults(
  year: string,
  subject: string
): Map<string, QuestionResult> {
  const history = getHistory();
  const map = new Map<string, QuestionResult>();
  for (const r of history) {
    if (r.year !== year || r.subject !== subject) continue;
    const existing = map.get(r.questionId);
    if (!existing || r.timestamp > existing.timestamp) {
      map.set(r.questionId, r);
    }
  }
  return map;
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
