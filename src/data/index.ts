import type { Question, MathCategory, JapaneseCategory, Year } from "../types/question";
import r4MathQuestions from "./questions/math/past-exams/r4";
import r5MathQuestions from "./questions/math/past-exams/r5";
import r6MathQuestions from "./questions/math/past-exams/r6";
import r7MathQuestions from "./questions/math/past-exams/r7";
import r8MathQuestions from "./questions/math/past-exams/r8";
import generatedTimeQuestions from "./questions/math/generated/time";
import r4JapaneseQuestions from "./questions/japanese/past-exams/r4";
import r5JapaneseQuestions from "./questions/japanese/past-exams/r5";
import r6JapaneseQuestions from "./questions/japanese/past-exams/r6";
import r7JapaneseQuestions from "./questions/japanese/past-exams/r7";
import r8JapaneseQuestions from "./questions/japanese/past-exams/r8";

export const allMathQuestions: Question[] = [
  ...r4MathQuestions,
  ...r5MathQuestions,
  ...r6MathQuestions,
  ...r7MathQuestions,
  ...r8MathQuestions,
  ...generatedTimeQuestions,
];

export const allJapaneseQuestions: Question[] = [
  ...r4JapaneseQuestions,
  ...r5JapaneseQuestions,
  ...r6JapaneseQuestions,
  ...r7JapaneseQuestions,
  ...r8JapaneseQuestions,
];

export const allQuestions: Question[] = [...allMathQuestions, ...allJapaneseQuestions];

export function getQuestionsByYear(year: Year, subject = "math"): Question[] {
  return allQuestions.filter((q) => q.year === year && q.subject === subject);
}

export function getQuestionsByCategory(category: MathCategory | JapaneseCategory | string): Question[] {
  return allQuestions.filter((q) => q.category === category);
}

export function getGeneratedQuestions(category?: string): Question[] {
  return allQuestions.filter(
    (q) => q.sourceType === "generated" && (!category || q.category === category)
  );
}

export const YEARS: { value: Year; label: string }[] = [
  { value: "R4", label: "令和4年度" },
  { value: "R5", label: "令和5年度" },
  { value: "R6", label: "令和6年度" },
  { value: "R7", label: "令和7年度" },
  { value: "R8", label: "令和8年度" },
];

export const MATH_CATEGORIES: { value: MathCategory; label: string }[] = [
  { value: "calculation", label: "計算" },
  { value: "unit", label: "単位" },
  { value: "number", label: "数・がい数" },
  { value: "table", label: "表の読み取り" },
  { value: "money", label: "お金の計算" },
  { value: "time", label: "時刻・時刻表" },
  { value: "geometry", label: "図形" },
  { value: "word_problem", label: "文章題" },
];

// 後方互換性のため
export const CATEGORIES = MATH_CATEGORIES;

export const JAPANESE_CATEGORIES: { value: JapaneseCategory; label: string }[] = [
  { value: "kanji", label: "漢字・ひらがな" },
  { value: "roman", label: "ローマ字" },
  { value: "conjugation", label: "活用形・送りがな" },
  { value: "idiom", label: "慣用句" },
  { value: "particle", label: "助詞" },
  { value: "reading", label: "長文読解" },
  { value: "document", label: "実用文読み取り" },
];

export const GENERATED_CATEGORIES: { value: string; label: string }[] = [
  { value: "time", label: "時刻・時刻表" },
  { value: "money", label: "お金の計算" },
  { value: "table", label: "表の読み取り" },
];

export function normalizeTimeAnswer(answer: string): string {
  let s = answer.trim().replace(/[　 ]/g, "");
  s = s.replace(/^0?(\d{1,2}):(\d{2})$/, "$1時$2分");
  s = s.replace(/(\d{1,2})時0(\d)分/, "$1時$2分");
  return s;
}

export function checkAnswer(
  userAnswer: string,
  correctAnswer: string | string[]
): boolean {
  const answers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  const normalized = normalizeTimeAnswer(userAnswer.trim());

  return answers.some((ans) => {
    const normalizedCorrect = normalizeTimeAnswer(ans.trim());
    if (normalized === normalizedCorrect) return true;
    const strip = (s: string) => s.replace(/^(午前|午後)/, "").trim();
    if (strip(normalized) === strip(normalizedCorrect)) return true;
    return false;
  });
}
