import type { Question } from "../types/question";

function boxes(answer: string): string {
  return "□".repeat([...answer].length);
}

export function getAnswerHint(question: Question): string | null {
  if (question.type !== "text" && question.type !== "number") return null;
  if (question.questionText.includes("□")) return null; // blank already visible in text
  if (question.answerHint) return question.answerHint;

  const answers = Array.isArray(question.answer) ? question.answer : [question.answer];

  // Many valid answers (pick-any style) — don't show specific boxes
  if (answers.length > 3) return null;

  // Very long answer — skip
  if (answers.some((a) => [...a].length > 15)) return null;

  if (answers.length > 1) {
    return answers.map((a) => `（${boxes(a)}）`).join("　");
  }

  const mainAnswer = answers[0];
  const b = boxes(mainAnswer);
  const qText = question.questionText;

  // Try to find context after 何 (e.g. "何年ほど前" → "（□□年ほど前）")
  const naniMatch = qText.match(
    /何([^はをがにかもでとよ。？」\n]{1,8}?)(?=[はをがにかもでとよ。？\n」]|$)/
  );
  if (naniMatch?.[1]?.trim()) {
    return `（${b}${naniMatch[1].trim()}）`;
  }

  // Conjugation: "___XXX" → "(□□□XXX)"
  const conjMatch = qText.match(/___(.{1,6}?)(?=[。\n」]|$)/);
  if (conjMatch?.[1]?.trim()) {
    return `（${b}${conjMatch[1].trim()}）`;
  }

  return `（${b}）`;
}
