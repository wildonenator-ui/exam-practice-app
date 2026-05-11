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
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  savedState?: SavedState;
  onBack?: () => void;
  onAnswer: (correct: boolean, userAnswer: string) => void;
  onNext: () => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  savedState,
  onBack,
  onAnswer,
  onNext,
}: Props) {
  const [userAnswer, setUserAnswer] = useState(savedState?.userAnswer ?? "");
  const [answered, setAnswered] = useState(!!savedState);
  const [isCorrect, setIsCorrect] = useState(savedState?.isCorrect ?? false);

  const hint = getAnswerHint(question);

  const handleAnswer = () => {
    if (!userAnswer.trim()) return;
    const correct = checkAnswer(userAnswer, question.answer);
    setIsCorrect(correct);
    setAnswered(true);
    onAnswer(correct, userAnswer);
  };

  const correctAnswerDisplay = Array.isArray(question.answer)
    ? question.answer[0]
    : question.answer;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 進捗バー */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold text-gray-600">
          {questionNumber} / {totalQuestions}
        </span>
        <div className="w-2/3 bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* 問題カード */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
            {question.title}
          </span>
          {question.year && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {question.year}
            </span>
          )}
        </div>

        <p className="text-lg leading-relaxed whitespace-pre-wrap mb-3">
          {question.questionText}
        </p>

        {question.table && <TableDisplay table={question.table} />}

        {/* 選択式 */}
        {question.type === "single_choice" && question.choices && !answered && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {question.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => setUserAnswer(choice)}
                className={`py-4 px-4 rounded-xl border-2 text-lg font-bold transition-all ${
                  userAnswer === choice
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
        {question.type === "single_choice" && question.choices && answered && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {question.choices.map((choice) => {
              const isSelected = userAnswer === choice;
              const isCorrectChoice = Array.isArray(question.answer)
                ? question.answer.includes(choice)
                : question.answer === choice;
              return (
                <div
                  key={choice}
                  className={`py-4 px-4 rounded-xl border-2 text-lg font-bold ${
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

        {/* テキスト・数値入力 */}
        {(question.type === "text" || question.type === "number") && !answered && (
          <>
            {hint && (
              <p className="mt-3 text-gray-400 text-base tracking-widest font-mono">
                {hint}
              </p>
            )}
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="答えを入力してください"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-xl mt-2 focus:border-blue-500 focus:outline-none"
            />
          </>
        )}

        {!answered && (
          <button
            onClick={handleAnswer}
            disabled={!userAnswer.trim()}
            className="w-full mt-4 bg-blue-500 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            答える
          </button>
        )}
      </div>

      {/* 正解・不正解フィードバック */}
      {answered && (
        <div
          className={`rounded-2xl p-5 mb-4 ${
            isCorrect
              ? "bg-green-50 border-2 border-green-400"
              : "bg-orange-50 border-2 border-orange-400"
          }`}
        >
          <p className={`text-2xl font-bold mb-2 ${isCorrect ? "text-green-600" : "text-orange-600"}`}>
            {isCorrect ? "正解！" : "もう少し！"}
          </p>
          {(question.type === "text" || question.type === "number") && (
            <p className="text-base text-gray-500 mb-1">あなたの答え：{userAnswer}</p>
          )}
          {!isCorrect && (
            <p className="text-lg mb-2">
              <span className="font-bold">正しい答え：</span>
              {correctAnswerDisplay}
            </p>
          )}
          <div className="mt-3 p-3 bg-white rounded-xl">
            <p className="font-bold text-gray-700 mb-1">考え方：</p>
            <p className="text-gray-600 leading-relaxed">{question.explanation}</p>
          </div>
        </div>
      )}

      {/* 常時表示ナビゲーション */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={onBack}
          disabled={!onBack}
          className="flex-1 bg-gray-200 text-gray-700 text-lg font-bold py-4 rounded-xl hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← 前の問題
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-blue-500 text-white text-lg font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors"
        >
          次の問題 →
        </button>
      </div>
    </div>
  );
}
