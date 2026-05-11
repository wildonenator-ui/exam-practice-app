import type { Question } from "../types/question";

function boxes(answer: string): string {
  return "□".repeat([...answer].length);
}

const MATH_UNIT_PATTERNS: Array<[RegExp, string]> = [
  [/何(度)/, "度"],
  [/何(cm²|cm|㎡|㎠|km|m)/, "$1"],
  [/何(g|kg|mL|dL|L)/, "$1"],
  [/何(点|杯|個|枚|本|冊|台|人|匹|羽|頭)/, "$1"],
  [/いくら/, "円"],
  [/何(円)/, "円"],
];

function extractMathUnit(questionText: string): string | null {
  for (const [pattern, unit] of MATH_UNIT_PATTERNS) {
    const m = questionText.match(pattern);
    if (m) {
      // If unit contains a back-reference, use capture group; otherwise use literal
      return unit.startsWith("$") ? m[1] : unit;
    }
  }
  return null;
}

export function getAnswerHint(question: Question): string | null {
  if (question.type !== "text" && question.type !== "number") return null;
  if (question.answerHint) return question.answerHint;

  // Math: only show a unit suffix hint, never show □□ boxes
  if (question.subject === "math") {
    const unit = extractMathUnit(question.questionText);
    if (unit) return `（＿＿＿＿＿${unit}）`;
    return null;
  }

  // Japanese: skip if blank already visible in the question text
  if (question.questionText.includes("□")) return null;

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
