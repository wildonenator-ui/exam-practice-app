import type { Question } from "../types/question";

interface Props {
  questions: Question[];
  results: boolean[];
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultSummary({ questions, results, onRetry, onHome }: Props) {
  const correct = results.filter(Boolean).length;
  const total = results.length;
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrongQuestions = questions.filter((_, i) => !results[i]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-4 text-center">
        <h2 className="text-2xl font-bold mb-4">結果発表！</h2>
        <div className="text-5xl font-bold text-blue-600 mb-2">{rate}%</div>
        <p className="text-xl text-gray-600 mb-4">
          {total}問中 <span className="font-bold text-green-600">{correct}問</span> 正解
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {results.map((r, i) => (
            <span key={i} className={`text-2xl ${r ? "text-green-500" : "text-red-400"}`}>
              {r ? "○" : "×"}
            </span>
          ))}
        </div>
      </div>

      {wrongQuestions.length > 0 && (
        <div className="bg-orange-50 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-lg text-orange-700 mb-3">
            間違えた問題（もう一度確認しよう）
          </h3>
          <ul className="space-y-2">
            {wrongQuestions.map((q) => (
              <li key={q.id} className="bg-white rounded-xl p-3">
                <p className="font-bold text-sm text-gray-500">{q.title}</p>
                <p className="text-gray-700 mt-1 text-sm line-clamp-2">{q.questionText.split('\n')[0]}</p>
                <p className="text-green-700 font-bold mt-1 text-sm">
                  正解：{Array.isArray(q.answer) ? q.answer[0] : q.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={onRetry}
          className="w-full bg-blue-500 text-white text-xl font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors"
        >
          もう一度解く
        </button>
        <button
          onClick={onHome}
          className="w-full bg-gray-200 text-gray-700 text-xl font-bold py-4 rounded-xl hover:bg-gray-300 transition-colors"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}
