import { useNavigate } from "react-router-dom";
import { YEARS, CATEGORIES, GENERATED_CATEGORIES } from "../data";
import { getCategoryStats } from "../utils/storage";

export default function HomePage() {
  const navigate = useNavigate();
  const stats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 pb-10">
      <div className="max-w-2xl mx-auto p-4">
        {/* ヘッダー */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            📚 かこもん練習アプリ
          </h1>
          <p className="text-gray-600 text-lg">算数の過去問を解いて実力をつけよう！</p>
        </div>

        {/* 年度別 */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-3 flex items-center gap-2">
            📅 年度別に解く
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {YEARS.map((y) => (
              <button
                key={y.value}
                onClick={() => navigate(`/practice?mode=year&value=${y.value}`)}
                className="bg-white rounded-2xl shadow p-4 text-left hover:shadow-md hover:bg-blue-50 transition-all flex items-center justify-between"
              >
                <span className="text-lg font-bold text-blue-700">{y.label}</span>
                <span className="text-gray-400 text-xl">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* 分野別 */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-3 flex items-center gap-2">
            📐 分野別に解く
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => {
              const s = stats[cat.value];
              const rate = s ? Math.round((s.correct / s.total) * 100) : null;
              return (
                <button
                  key={cat.value}
                  onClick={() => navigate(`/practice?mode=category&value=${cat.value}`)}
                  className="bg-white rounded-2xl shadow p-4 text-left hover:shadow-md hover:bg-blue-50 transition-all"
                >
                  <span className="text-base font-bold text-blue-700">{cat.label}</span>
                  {rate !== null && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-400 h-2 rounded-full"
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

        {/* 疑似問題 */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-3 flex items-center gap-2">
            ✨ 疑似問題を解く
          </h2>
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
      </div>
    </div>
  );
}
