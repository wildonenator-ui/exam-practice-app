import type { Question, MathCategory, Year } from "../types/question";
import r4MathQuestions from "./questions/math/past-exams/r4";
import r5MathQuestions from "./questions/math/past-exams/r5";
import r6MathQuestions from "./questions/math/past-exams/r6";
import generatedTimeQuestions from "./questions/math/generated/time";

export const allQuestions: Question[] = [
  ...r4MathQuestions,
  ...r5MathQuestions,
  ...r6MathQuestions,
  ...generatedTimeQuestions,
];

export function getQuestionsByYear(year: Year): Question[] {
  return allQuestions.filter((q) => q.year === year);
}

export function getQuestionsByCategory(category: MathCategory | string): Question[] {
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
];

export const CATEGORIES: { value: MathCategory; label: string }[] = [
  { value: "calculation", label: "計算" },
  { value: "unit", label: "単位" },
  { value: "number", label: "数・がい数" },
  { value: "table", label: "表の読み取り" },
  { value: "money", label: "お金の計算" },
  { value: "time", label: "時刻・時刻表" },
  { value: "geometry", label: "図形" },
  { value: "word_problem", label: "文章題" },
];

export const GENERATED_CATEGORIES: { value: string; label: string }[] = [
  { value: "time", label: "時刻・時刻表" },
  { value: "money", label: "お金の計算" },
  { value: "table", label: "表の読み取り" },
];
