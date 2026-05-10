import { useState } from "react";
import type { Question } from "../types/question";
import { checkAnswer } from "../utils/grading";
import { getAnswerHint } from "../utils/answerHint";
import TableDisplay from "./TableDisplay";

interface SavedState {
  userAnswer: string;
  isCorrect: boolean;
}

interface Props {
  questions: Question[];
  groupStartNumber: number;
  totalQuestions: number;
  savedStates?: Record<string, SavedState>; // keyed by question.id
  onBack?: () => void;
  onGroupAnswer: (results: boolean[], userAnswers: string[]) => void;
  onNext: () => void;
}

function extractParts(text: string): { passage: string; question: string } {
  const markerIdx = text.indexOf("【問い】");
  if (markerIdx !== -1) {
    return {
      passage: text.slice(0, markerIdx).trim(),
      question: text.slice(markerIdx + "【問い】".length).trim(),
    };
  }
  const lastBreak = text.lastIndexOf("\n\n");
  if (lastBreak !== -1) {
    return {
      passage: text.slice(0, lastBreak).trim(),
      question: text.slice(lastBreak).trim(),
    };
  }
  return { passage: "", question: text };
}

function buildPassageText(questions: Question[]): string {
  const parts = questions.map((q) => extractParts(q.questionText));
  const passages = parts.map((p) => p.passage);

  if (passages.every((p) => p === passages[0])) {
    return passages[0];
  }

  const seen = new Set<string>();
  const paragraphs: string[] = [];
  for (const p of passages) {
    const clean = p.replace(/^【文章】\s*/, "").trim();
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      paragraphs.push(clean);
    }
  }
  return paragraphs.join("\n\n");
}

export default function PassageGroupCard({
  questions,
  groupStartNumber,
  totalQuestions,
  savedStates,
  onBack,
  onGroupAnswer,
  onNext,
}: Props) {
  const isReview = !!savedStates && questions.every((q) => savedStates[q.id] !== undefined);

  const [answers, setAnswers] = useState<string[]>(() =>
    questions.map((q) => savedStates?.[q.id]?.userAnswer ?? "")
  );
  const [submitted, setSubmitted] = useState(isReview);
  const [correctness, setCorrectness] = useState<boolean[]>(() =>
    isReview ? questions.map((q) => savedStates![q.id].isCorrect) : []
  );

  const allFilled = answers.every((a) => a.trim() !== "");
  const lastNumber = groupStartNumber + questions.length - 1;

  const passageText = buildPassageText(questions);
  const questionParts = questions.map((q) => extractParts(q.questionText).question);

  const handleSubmit = () => {
    const results = questions.map((q, i) => checkAnswer(answers[i], q.answer));
    setCorrectness(results);
    setSubmitted(true);
    onGroupAnswer(results, answers);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 進捗バー */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold text-gray-600">
          {groupStartNumber}–{lastNumber} / {totalQuestions}
        </span>
        <div className="w-2/3 bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(lastNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* 文章全文 */}
      {passageText && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">
          <p className="text-base leading-relaxed whitespace-pre-wrap">{passageText}</p>
        </div>
      )}

      {/* 設問一覧 */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const answer = answers[idx];
          const isCorrect = correctness[idx];
          const hint = getAnswerHint(q);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl shadow-md p-5 ${
                submitted
                  ? isCorrect
                    ? "border-2 border-green-400"
                    : "border-2 border-orange-400"
                  : "border border-gray-100"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                  設問{idx + 1}
                </span>
                {submitted && (
                  <span
                    className={`text-xl font-bold ${
                      isCorrect ? "text-green-600" : "text-orange-500"
                    }`}
                  >
                    {isCorrect ? "○" : "×"}
                  </span>
                )}
              </div>

              <p className="text-base leading-relaxed whitespace-pre-wrap mb-3">
                {questionParts[idx]}
              </p>

              {q.table && <TableDisplay table={q.table} />}

              {/* 選択式（未回答） */}
              {q.type === "single_choice" && q.choices && !submitted && (
                <div className="grid grid-cols-2 gap-2">
                  {q.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => {
                        const next = [...answers];
                        next[idx] = choice;
                        setAnswers(next);
                      }}
                      className={`py-3 px-3 rounded-xl border-2 text-base font-bold transition-all ${
                        answer === choice
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white hover:border-blue-300"
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {/* 選択式（回答済み） */}
              {q.type === "single_choice" && q.choices && submitted && (
                <div className="grid grid-cols-2 gap-2">
                  {q.choices.map((choice) => {
                    const isSelected = answer === choice;
                    const isCorrectChoice = Array.isArray(q.answer)
                      ? q.answer.includes(choice)
                      : q.answer === choice;
                    return (
                      <div
                        key={choice}
                        className={`py-3 px-3 rounded-xl border-2 text-base font-bold ${
                          isCorrectChoice
                            ? "border-green-500 bg-green-50 text-green-700"
                            : isSelected
                            ? "border-red-400 bg-red-50 text-red-600"
                            : "border-gray-200 bg-gray-50 text-gray-400"
                        }`}
                      >
                        {choice}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* テキスト入力 */}
              {(q.type === "text" || q.type === "number") && !submitted && (
                <>
                  {hint && (
                    <p className="text-gray-400 text-sm tracking-widest font-mono mb-1">
                      {hint}
                    </p>
                  )}
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      const next = [...answers];
                      next[idx] = e.target.value;
                      setAnswers(next);
                    }}
                    placeholder="答えを入力"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:border-blue-500 focus:outline-none"
                  />
                </>
              )}

              {/* フィードバック */}
              {submitted && (
                <div className="mt-3">
                  {(q.type === "text" || q.type === "number") && (
                    <p className="text-sm text-gray-500 mb-1">あなたの答え：{answer}</p>
                  )}
                  {!isCorrect && (
                    <p className="text-base mb-2">
                      <span className="font-bold">正しい答え：</span>
                      {Array.isArray(q.answer) ? q.answer[0] : q.answer}
                    </p>
                  )}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-gray-700 text-sm mb-1">考え方：</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 送信 / ナビゲーション */}
      <div className="mt-5 mb-8">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allFilled}
            className="w-full bg-blue-500 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            答えを確認する
          </button>
        ) : (
          <div className="flex gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 text-gray-700 text-lg font-bold py-4 rounded-xl hover:bg-gray-300 transition-colors"
              >
                ← 前の問題
              </button>
            )}
            <button
              onClick={onNext}
              className="flex-1 bg-blue-500 text-white text-lg font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              次の問題 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
