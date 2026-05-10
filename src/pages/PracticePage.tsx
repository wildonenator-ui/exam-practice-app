import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Question, Year } from "../types/question";
import { getQuestionsByYear, getQuestionsByCategory, getGeneratedQuestions } from "../data";
import { shuffle } from "../utils/shuffle";
import { saveResult } from "../utils/storage";
import QuestionCard from "../components/QuestionCard";
import ResultSummary from "../components/ResultSummary";

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") ?? "year";
  const value = searchParams.get("value") ?? "R4";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let qs: Question[] = [];
    if (mode === "year") {
      qs = getQuestionsByYear(value as Year);
    } else if (mode === "category") {
      qs = getQuestionsByCategory(value);
    } else if (mode === "generated") {
      qs = getGeneratedQuestions(value);
    }
    if (qs.length === 0) {
      navigate("/");
      return;
    }
    setQuestions(shuffle(qs));
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
  }, [mode, value, navigate]);

  const handleAnswer = (correct: boolean) => {
    const q = questions[currentIndex];
    saveResult({
      questionId: q.id,
      correct,
      timestamp: Date.now(),
      category: q.category,
    });
    setResults((prev) => [...prev, correct]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRetry = () => {
    setQuestions((qs) => shuffle([...qs]));
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">問題を読み込み中...</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 py-6">
        <ResultSummary
          questions={questions}
          results={results}
          onRetry={handleRetry}
          onHome={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 py-6">
      <div className="max-w-2xl mx-auto px-4 mb-2">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-bold hover:underline text-base"
        >
          ← ホームに戻る
        </button>
      </div>
      <QuestionCard
        question={questions[currentIndex]}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
