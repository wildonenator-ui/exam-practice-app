import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Question, Year } from "../types/question";
import { getQuestionsByYear, getQuestionsByCategory, getGeneratedQuestions } from "../data";
import { shuffle } from "../utils/shuffle";
import { saveResult, getLatestYearResults } from "../utils/storage";
import QuestionCard from "../components/QuestionCard";
import PassageGroupCard from "../components/PassageGroupCard";
import ResultSummary from "../components/ResultSummary";

function findGroupBounds(questions: Question[], index: number): { start: number; end: number } {
  const pid = questions[index]?.passageId;
  if (!pid) return { start: index, end: index + 1 };
  let start = index;
  while (start > 0 && questions[start - 1].passageId === pid) start--;
  let end = start;
  while (end < questions.length && questions[end].passageId === pid) end++;
  return { start, end };
}

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") ?? "year";
  const value = searchParams.get("value") ?? "R5";
  const subject = searchParams.get("subject") ?? "math";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [resumePrompt, setResumePrompt] = useState<{ index: number; preResults: boolean[] } | null>(null);

  useEffect(() => {
    let qs: Question[] = [];
    if (mode === "year") {
      qs = getQuestionsByYear(value as Year, subject);
    } else if (mode === "category") {
      qs = getQuestionsByCategory(value);
    } else if (mode === "generated") {
      qs = getGeneratedQuestions(value);
    }
    if (qs.length === 0) {
      navigate("/");
      return;
    }
    const ordered = mode === "year" ? qs : shuffle(qs);
    setQuestions(ordered);
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
    setResumePrompt(null);

    if (mode === "year") {
      const latestResults = getLatestYearResults(value, subject);
      if (latestResults.size > 0) {
        const firstUnanswered = ordered.findIndex((q) => !latestResults.has(q.id));
        if (firstUnanswered > 0 && firstUnanswered < ordered.length) {
          // Snap to the start of the group containing the first unanswered question
          const { start } = findGroupBounds(ordered, firstUnanswered);
          const preResults = ordered.slice(0, start).map((q) => {
            return latestResults.get(q.id)?.correct ?? false;
          });
          setResumePrompt({ index: start, preResults });
        }
      }
    }
  }, [mode, value, subject, navigate]);

  const handleResume = () => {
    if (!resumePrompt) return;
    setCurrentIndex(resumePrompt.index);
    setResults(resumePrompt.preResults);
    setResumePrompt(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setResults([]);
    setResumePrompt(null);
  };

  const handleAnswer = (correct: boolean) => {
    const q = questions[currentIndex];
    saveResult({
      questionId: q.id,
      correct,
      timestamp: Date.now(),
      category: q.category,
      year: mode === "year" ? value : undefined,
      subject: mode === "year" ? subject : undefined,
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

  const handleGroupAnswer = (groupQuestions: Question[], groupResults: boolean[]) => {
    groupQuestions.forEach((q, i) => {
      saveResult({
        questionId: q.id,
        correct: groupResults[i],
        timestamp: Date.now(),
        category: q.category,
        year: mode === "year" ? value : undefined,
        subject: mode === "year" ? subject : undefined,
      });
    });
    setResults((prev) => [...prev, ...groupResults]);
  };

  const handleGroupNext = (groupSize: number) => {
    if (currentIndex + groupSize >= questions.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + groupSize);
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
          yearMode={mode === "year" ? { year: value, subject } : undefined}
          onReview={
            mode === "year"
              ? () => navigate(`/review?year=${value}&subject=${subject}`)
              : undefined
          }
        />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const passageId = currentQuestion?.passageId;

  // Determine if current position is the start of a passage group
  let groupQuestions: Question[] | null = null;
  if (passageId) {
    const { start, end } = findGroupBounds(questions, currentIndex);
    if (currentIndex === start) {
      groupQuestions = questions.slice(start, end);
    }
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

      {/* Resume prompt */}
      {resumePrompt && (
        <div className="max-w-2xl mx-auto px-4 mb-4">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-5">
            <p className="font-bold text-yellow-800 text-lg mb-3">
              前回の途中から再開できます（{resumePrompt.index + 1}問目から）
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleResume}
                className="flex-1 bg-yellow-400 text-white font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors"
              >
                続きから再開する
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
              >
                最初からやり直す
              </button>
            </div>
          </div>
        </div>
      )}

      {groupQuestions ? (
        <PassageGroupCard
          questions={groupQuestions}
          groupStartNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onGroupAnswer={(groupResults) => handleGroupAnswer(groupQuestions!, groupResults)}
          onNext={() => handleGroupNext(groupQuestions!.length)}
        />
      ) : (
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
