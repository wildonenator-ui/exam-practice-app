import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { YEARS, MATH_CATEGORIES, GENERATED_CATEGORIES, JAPANESE_CATEGORIES, getQuestionsByYear } from "../data";
import { getCategoryStats, getLatestYearResults, clearHistory } from "../utils/storage";

type SubjectTab = "math" | "japanese";

export default function HomePage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<SubjectTab>("math");
  const [confirmClear, setConfirmClear] = useState(false);
  const stats = getCategoryStats();

  const categories = subject === "math" ? MATH_CATEGORIES : JAPANESE_CATEGORIES;
  const color = subject === "math" ? "blue" : "green";

  function getYearProgress(year: string) {
    const questions = getQuestionsByYear(year as any, subject);
    const latestResults = getLatestYearResults(year, subject);
    const total = questions.length;
    const attempted = latestResults.size;
    const correct = [...latestResults.values()].filter((r) => r.correct).length;
    return { total, attempted, correct };
  }

  function handleClear() {
    if (confirmClear) {
      clearHistory();
      setConfirmClear(false);
      window.location.reload();
    } else {
      setConfirmClear(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 pb-10">
      <div className="max-w-2xl mx-auto p-4">
        {/* ヘッダー */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            かこもん練習アプリ
          </h1>
          <p className="text-gray-600 text-lg">過去問を解いて実力をつけよう！</p>
        </div>

        {/* 科目タブ */}
        <div className="flex rounded-xl overflow-hidden border border-blue-200 mb-6 shadow-sm">
          <button
            onClick={() => setSubject("math")}
            className={`flex-1 py-3 text-lg font-bold transition-all ${
              subject === "math"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-50"
            }`}
          >
            算数・数学
          </button>
          <button
            onClick={() => setSubject("japanese")}
            className={`flex-1 py-3 text-lg font-bold transition-all ${
              subject === "japanese"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 hover:bg-green-50"
            }`}
          >
            国語
          </button>
        </div>

        {/* 年度別 */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-3">年度別に解く</h2>
          <div className="grid grid-cols-1 gap-3">
            {YEARS.map((y) => {
              const prog = getYearProgress(y.value);
              const hasProgress = prog.attempted > 0;
              const isComplete = prog.attempted === prog.total && prog.total > 0;
              const rate =
                prog.attempted > 0
                  ? Math.round((prog.correct / prog.attempted) * 100)
                  : null;

              return (
                <div
                  key={y.value}
                  className="bg-white rounded-2xl shadow hover:shadow-md transition-all"
                >
                  <button
                    onClick={() =>
                      navigate(
                        `/practice?mode=year&value=${y.value}&subject=${subject}`
                      )
                    }
                    className={`w-full p-4 text-left flex items-center justify-between rounded-2xl hover:bg-${color}-50 transition-all`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-lg font-bold text-${color}-700`}
                        >
                          {y.label}
                        </span>
                        {isComplete && (
                          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                            完了
                          </span>
                        )}
                        {hasProgress && !isComplete && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">
                            挑戦中
                          </span>
                        )}
                        {!hasProgress && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            未挑戦
                          </span>
                        )}
                      </div>
                      {hasProgress && rate !== null && (
                        <div className="mt-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-400"
                                style={{ width: `${rate}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {prog.correct}/{prog.attempted}問正解
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400 text-xl ml-3">→</span>
                  </button>
                  {hasProgress && (
                    <div className="px-4 pb-3 -mt-1">
                      <button
                        onClick={() =>
                          navigate(`/review?year=${y.value}&subject=${subject}`)
                        }
                        className={`text-sm font-bold text-${color}-600 hover:underline`}
                      >
                        振り返りを見る →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 分野別 */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-3">分野別に解く</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const s = stats[cat.value];
              const rate = s ? Math.round((s.correct / s.total) * 100) : null;
              return (
                <button
                  key={cat.value}
                  onClick={() => navigate(`/practice?mode=category&value=${cat.value}`)}
                  className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition-all hover:bg-${color}-50`}
                >
                  <span className={`text-base font-bold text-${color}-700`}>
                    {cat.label}
                  </span>
                  {rate !== null && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${subject === "math" ? "bg-green-400" : "bg-emerald-400"}`}
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">正答率 {rate}%</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 疑似問題（算数のみ） */}
        {subject === "math" && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-3">疑似問題を解く</h2>
            <div className="grid grid-cols-1 gap-3">
              {GENERATED_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => navigate(`/practice?mode=generated&value=${cat.value}`)}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow p-4 text-left hover:shadow-md transition-all flex items-center justify-between border border-purple-200"
                >
                  <div>
                    <span className="text-base font-bold text-purple-700">{cat.label}</span>
                    <p className="text-xs text-gray-500 mt-1">練習用の疑似問題</p>
                  </div>
                  <span className="text-gray-400 text-xl">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 進捗クリア */}
        <section className="mb-4">
          <div className="border border-red-200 rounded-2xl p-4 bg-red-50">
            <h2 className="text-base font-bold text-red-700 mb-2">進捗の管理</h2>
            <p className="text-xs text-gray-600 mb-3">
              解答履歴をすべて削除します。この操作は取り消せません。
            </p>
            {confirmClear ? (
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="flex-1 bg-red-500 text-white font-bold py-2 rounded-xl hover:bg-red-600 transition-colors text-sm"
                >
                  本当に削除する
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded-xl hover:bg-gray-300 transition-colors text-sm"
                >
                  キャンセル
                </button>
              </div>
            ) : (
              <button
                onClick={handleClear}
                className="w-full bg-white border border-red-300 text-red-600 font-bold py-2 rounded-xl hover:bg-red-100 transition-colors text-sm"
              >
                進捗状況をクリア
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
