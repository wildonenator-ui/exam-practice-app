export type Subject = "math" | "japanese";
export type SourceType = "past_exam" | "generated";
export type QuestionType = "single_choice" | "text" | "number" | "multi_part";
export type Year = "R4" | "R5" | "R6" | "R7";

export type MathCategory =
  | "calculation"
  | "unit"
  | "number"
  | "table"
  | "money"
  | "time"
  | "geometry"
  | "word_problem";

export interface TableData {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface Question {
  id: string;
  subject: Subject;
  year?: Year;
  sourceType: SourceType;
  category: MathCategory | string;
  title: string;
  questionText: string;
  type: QuestionType;
  choices?: string[];
  answer: string | string[];
  explanation: string;
  table?: TableData;
  imageNote?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}
