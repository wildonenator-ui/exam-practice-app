export function normalizeTimeAnswer(answer: string): string {
  let s = answer.trim().replace(/[　 ]/g, "");
  // 09:50 / 9:50 → 9時50分
  s = s.replace(/^0?(\d{1,2}):(\d{2})$/, "$1時$2分");
  // 01分 → 1分（ゼロパディング除去）
  s = s.replace(/(\d{1,2})時0(\d)分/, "$1時$2分");
  return s;
}

export function checkAnswer(
  userAnswer: string,
  correctAnswer: string | string[]
): boolean {
  const answers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  const normalized = normalizeTimeAnswer(userAnswer.trim());

  return answers.some((ans) => {
    const normalizedCorrect = normalizeTimeAnswer(ans.trim());
    if (normalized === normalizedCorrect) return true;
    // 午前/午後を除いて比較
    const strip = (s: string) => s.replace(/^(午前|午後)/, "").trim();
    if (strip(normalized) === strip(normalizedCorrect)) return true;
    return false;
  });
}
