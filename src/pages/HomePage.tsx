import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { YEARS, MATH_CATEGORIES, GENERATED_CATEGORIES, JAPANESE_CATEGORIES } from "../data";
import { getCategoryStats } from "../utils/storage";

type SubjectTab = "math" | "japanese";

export default function HomePage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<SubjectTab>("math");
  const stats = getCategoryStats();

  const categories = subject === "math" ? MATH_CATEGORIES : JAPANESE_CATEGORIES;

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
            {YEARS.map((y) => (
              <button
                key={y.value}
                onClick={() => navigate(`/practice?mode=year&value=${y.value}&subject=${subject}`)}
                className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition-all flex items-center justify-between ${
                  subject === "math" ? "hover:bg-blue-50" : "hover:bg-green-50"
                }`}
              >
                <span className={`text-lg font-bold ${subject === "math" ? "text-blue-700" : "text-green-700"}`}>
                  {y.label}
                </span>
                <span className="text-gray-400 text-xl">→</span>
              </button>
            ))}
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
                  className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition-all ${
                    subject === "math" ? "hover:bg-blue-50" : "hover:bg-green-50"
                  }`}
                >
                  <span className={`text-base font-bold ${subject === "math" ? "text-blue-700" : "text-green-700"}`}>
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
      </div>
    </div>
  );
}
