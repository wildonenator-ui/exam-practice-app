import { useState } from "react";
import type { Question } from "../types/question";
import { checkAnswer } from "../utils/grading";
import TableDisplay from "./TableDisplay";

interface Props {
  questions: Question[];
  groupStartNumber: number;
  totalQuestions: number;
  onGroupAnswer: (results: boolean[]) => void;
  onNext: () => void;
}

export default function PassageGroupCard({
  questions,
  groupStartNumber,
  totalQuestions,
  onGroupAnswer,
  onNext,
}: Props) {
  const [answers, setAnswers] = useState<string[]>(() => questions.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const [correctness, setCorrectness] = useState<boolean[]>([]);

  const allFilled = answers.every((a) => a.trim() !== "");
  const lastNumber = groupStartNumber + questions.length - 1;

  const handleSubmit = () => {
    const results = questions.map((q, i) => checkAnswer(answers[i], q.answer));
    setCorrectness(results);
    setSubmitted(true);
    onGroupAnswer(results);
  };

  const handleNext = () => {
    onNext();
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

      {/* 問題一覧 */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const answer = answers[idx];
          const isCorrect = correctness[idx];

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl shadow-md p-5 ${
                submitted
                  ? isCorrect
                    ? "border-2 border-green-400"
                    : "border-2 border-orange-400"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                  {q.title}
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
                {q.questionText}
              </p>

              {q.table && <TableDisplay table={q.table} />}

              {/* 選択式 */}
              {q.type === "single_choice" && q.choices && !submitted && (
                <div className="grid grid-cols-2 gap-2 mt-3">
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

              {/* 選択式（回答済み表示） */}
              {q.type === "single_choice" && q.choices && submitted && (
                <div className="grid grid-cols-2 gap-2 mt-3">
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
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const next = [...answers];
                    next[idx] = e.target.value;
                    setAnswers(next);
                  }}
                  placeholder="答えを入力"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg mt-3 focus:border-blue-500 focus:outline-none"
                />
              )}

              {/* フィードバック */}
              {submitted && (
                <div className="mt-3">
                  {!isCorrect && (
                    <p className="text-base mb-1">
                      <span className="font-bold">正しい答え：</span>
                      {Array.isArray(q.answer) ? q.answer[0] : q.answer}
                    </p>
                  )}
                  {(q.type === "text" || q.type === "number") && answer && (
                    <p className="text-sm text-gray-500 mb-1">
                      あなたの答え：{answer}
                    </p>
                  )}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-gray-700 text-sm mb-1">考え方：</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 送信 / 次へ ボタン */}
      <div className="mt-5">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allFilled}
            className="w-full bg-blue-500 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            答えを確認する
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors"
          >
            次の問題 →
          </button>
        )}
      </div>
    </div>
  );
}
