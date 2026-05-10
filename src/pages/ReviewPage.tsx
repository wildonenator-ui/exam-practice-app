import { useNavigate, useSearchParams } from "react-router-dom";
import type { Year } from "../types/question";
import { getQuestionsByYear, YEARS } from "../data";
import { getLatestYearResults } from "../utils/storage";

export default function ReviewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const year = (searchParams.get("year") ?? "R5") as Year;
  const subject = searchParams.get("subject") ?? "math";

  const questions = getQuestionsByYear(year, subject);
  const latestResults = getLatestYearResults(year, subject);

  const yearLabel = YEARS.find((y) => y.value === year)?.label ?? year;
  const subjectLabel = subject === "math" ? "算数・数学" : "国語";
  const color = subject === "math" ? "blue" : "green";

  const attempted = questions.filter((q) => latestResults.has(q.id));
  const correct = attempted.filter((q) => latestResults.get(q.id)?.correct);
  const wrong = attempted.filter((q) => !latestResults.get(q.id)?.correct);
  const notAttempted = questions.filter((q) => !latestResults.has(q.id));

  const rate =
    attempted.length > 0 ? Math.round((correct.length / attempted.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 pb-10">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className={`text-${color}-600 font-bold hover:underline text-base`}
          >
            ← ホームに戻る
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h1 className={`text-2xl font-bold text-${color}-700 mb-1`}>
            {yearLabel}　{subjectLabel}　振り返り
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            {questions.length}問中 {attempted.length}問挑戦済み
          </p>

          {attempted.length > 0 ? (
            <>
              <div className="text-center mb-4">
                <div className={`text-5xl font-bold text-${color}-600 mb-1`}>{rate}%</div>
                <p className="text-gray-600">
                  <span className="font-bold text-green-600">{correct.length}問</span>正解
                  ／
                  <span className="font-bold text-red-500">{wrong.length}問</span>不正解
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="h-3 rounded-full bg-green-400 transition-all"
                  style={{ width: `${rate}%` }}
                />
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-4">まだ挑戦していません。</p>
          )}

          <button
            onClick={() =>
              navigate(`/practice?mode=year&value=${year}&subject=${subject}`)
            }
            className={`w-full bg-${color}-500 text-white text-lg font-bold py-3 rounded-xl hover:bg-${color}-600 transition-colors`}
          >
            {attempted.length > 0 ? "もう一度挑戦する" : "挑戦する"}
          </button>
        </div>

        {wrong.length > 0 && (
          <div className="bg-red-50 rounded-2xl p-5 mb-4">
            <h2 className="font-bold text-lg text-red-700 mb-3">
              間違えた問題（{wrong.length}問）
            </h2>
            <ul className="space-y-3">
              {wrong.map((q) => (
                <li key={q.id} className="bg-white rounded-xl p-4">
                  <p className="font-bold text-sm text-gray-500">{q.title}</p>
                  <p className="text-gray-700 mt-1 text-sm">
                    {q.questionText.split("\n")[0]}
                  </p>
                  <p className="text-green-700 font-bold mt-2 text-sm">
                    正解：{Array.isArray(q.answer) ? q.answer[0] : q.answer}
                  </p>
                  {q.explanation && (
                    <p className="text-gray-500 text-xs mt-1">{q.explanation}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {correct.length > 0 && (
          <div className="bg-green-50 rounded-2xl p-5 mb-4">
            <h2 className="font-bold text-lg text-green-700 mb-3">
              正解した問題（{correct.length}問）
            </h2>
            <ul className="space-y-2">
              {correct.map((q) => (
                <li key={q.id} className="bg-white rounded-xl p-3 flex items-center gap-2">
                  <span className="text-green-500 text-xl">○</span>
                  <div>
                    <p className="font-bold text-sm text-gray-700">{q.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {q.questionText.split("\n")[0]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {notAttempted.length > 0 && attempted.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-4">
            <h2 className="font-bold text-lg text-gray-600 mb-3">
              未挑戦の問題（{notAttempted.length}問）
            </h2>
            <ul className="space-y-2">
              {notAttempted.map((q) => (
                <li key={q.id} className="bg-white rounded-xl p-3">
                  <p className="font-bold text-sm text-gray-700">{q.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {q.questionText.split("\n")[0]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
