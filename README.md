# かこもん練習アプリ

小学生向け学力検査（数学）の過去問演習Webアプリです。

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開いてください。

## ビルド方法

```bash
npm run build
```

`dist/` フォルダが生成されます。GitHub Pages へのデプロイは `dist/` を公開するだけで動作します。

## 問題データの追加方法

### 年度別過去問の追加方法（例：令和7年度）

1. `src/data/questions/math/past-exams/r7.ts` を作成する
2. 既存の `r6.ts` を参考に `Question[]` を定義してエクスポートする
3. `src/data/index.ts` に以下を追記する：

```ts
// インポートを追加
import r7MathQuestions from "./questions/math/past-exams/r7";

// allQuestions に追加
export const allQuestions: Question[] = [
  ...r4MathQuestions,
  ...r5MathQuestions,
  ...r6MathQuestions,
  ...r7MathQuestions,  // ← 追加
  ...generatedTimeQuestions,
];

// YEARS 配列に追加
export const YEARS = [
  ...
  { value: "R7", label: "令和7年度" },  // ← 追加
];
```

### 疑似問題の追加方法

- 時刻・時刻表：`src/data/questions/math/generated/time.ts` に追記
- お金の計算：`src/data/questions/math/generated/money.ts` を新規作成して `index.ts` に追加
- 表の読み取り：`src/data/questions/math/generated/table.ts` を新規作成して `index.ts` に追加

### カテゴリの追加方法

1. `src/types/question.ts` の `MathCategory` 型に新しいカテゴリを追加する
2. `src/data/index.ts` の `CATEGORIES` 配列に `{ value: "新カテゴリ", label: "表示名" }` を追加する
3. 対応する問題データファイルを作成して `allQuestions` に追加する

## 問題データの型定義

```ts
export interface Question {
  id: string;           // 一意のID (例: "r7-math-calc-1")
  subject: "math" | "japanese";
  year?: "R4" | "R5" | "R6" | "R7";
  sourceType: "past_exam" | "generated";
  category: MathCategory | string;
  title: string;        // 問題の短いタイトル
  questionText: string; // 問題文（改行は \n）
  type: "single_choice" | "text" | "number" | "multi_part";
  choices?: string[];   // 選択式の場合
  answer: string | string[];  // 複数の正解表記も可
  explanation: string;  // 解説（考え方）
  table?: {             // 表がある場合
    title?: string;
    headers: string[];
    rows: string[][];
  };
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}
```

## Claude Code への追加改修プロンプト例

### 令和7年度の過去問を追加する場合

```
令和7年度 数学の過去問PDFを追加しました。
既存の令和4〜6年度の問題データ構造（src/data/questions/math/past-exams/r6.ts）を参考にして、
令和7年度 数学の問題を追加してください。

作業内容：
1. src/data/questions/math/past-exams/r7.ts を作成する
2. src/data/index.ts に令和7年度を追加する（import・allQuestions・YEARS）
3. ホーム画面の年度別選択に「令和7年度」が表示されることを確認する
4. npm run build でビルドエラーがないことを確認する

注意：既存の型定義・UIは変更しない。図形など画像が必要な問題は後回しでよい。
解説を必ず付けること。
```

### 疑似問題を追加する場合

```
時刻表の疑似問題を10問追加してください。
既存の src/data/questions/math/generated/time.ts に追記してください。

令和4〜6年度の出題傾向に合わせ、以下のパターンで問題を作成してください：
- 目的地への到着予定時刻がある
- 駅またはバス停から目的地まで徒歩時間がある
- 家の最寄り駅またはバス停から駅までの乗車時間がある
- 時刻表が与えられている
- 到着時刻から逆算して、遅くとも何時何分の便に乗ればよいかを答える

各問題には id・subject・sourceType・category・title・questionText・table・type・answer・explanation・difficulty・tags を必ず含めること。
既存のUIや型定義は変更しないこと。
```

### 分野別問題を一括追加する場合

```
src/data/questions/math/past-exams/r4.ts に、令和4年度の「図形」問題を追加してください。
category は "geometry"、id は "r4-math-geometry-1" 形式にしてください。
テキストで表現できる問題（辺の名前、図形の名前当てなど）を優先してください。
追加後に npm run build でエラーがないことを確認してください。
```

## ディレクトリ構成

```
src/
  data/
    questions/
      math/
        past-exams/
          r4.ts        ← 令和4年度 数学
          r5.ts        ← 令和5年度 数学
          r6.ts        ← 令和6年度 数学
        generated/
          time.ts      ← 疑似問題：時刻・時刻表
      japanese/        ← 国語問題用（今後追加予定）
    index.ts           ← 問題の集約・フィルタ関数・定数定義
  types/
    question.ts        ← 型定義
  utils/
    grading.ts         ← 正誤判定（時刻の表記ゆれ対応）
    shuffle.ts         ← 問題シャッフル
    storage.ts         ← localStorage による履歴保存
  components/
    QuestionCard.tsx   ← 問題表示・回答UI
    TableDisplay.tsx   ← 表のレンダリング
    ResultSummary.tsx  ← 結果画面
  pages/
    HomePage.tsx       ← ホーム画面
    PracticePage.tsx   ← 演習画面
  App.tsx
  main.tsx
  index.css
```

## 問題数

- 令和4年度 数学：17問
- 令和5年度 数学：19問
- 令和6年度 数学：19問
- 疑似問題（時刻・時刻表）：5問
- **合計：60問**
