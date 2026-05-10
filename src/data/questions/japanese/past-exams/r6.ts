import type { Question } from "../../../../types/question";

const r6JapaneseQuestions: Question[] = [
  // 大問1: 漢字/ひらがな変換
  {
    id: "r6-jp-kanji-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "kanji",
    title: "ひらがな→漢字変換①",
    questionText: "次のひらがなを漢字に直しなさい。\n「にゅうがくしき」の朝。",
    type: "text",
    answer: "入学式",
    explanation: "にゅうがくしき = 入学式（にゅう＝入、がく＝学、しき＝式）",
    difficulty: 1,
    tags: ["漢字", "変換"],
  },
  {
    id: "r6-jp-kanji-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "kanji",
    title: "ひらがな→漢字変換②",
    questionText: "次のひらがなを漢字に直しなさい。\nマナーを「まもる」。",
    type: "text",
    answer: "守る",
    explanation: "まもる = 守る（守＝まも、る＝送りがな）",
    difficulty: 1,
    tags: ["漢字", "変換", "送りがな"],
  },
  {
    id: "r6-jp-kanji-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "kanji",
    title: "ひらがな→漢字変換③",
    questionText: "次のひらがなを漢字に直しなさい。\n「やさい」を育てる。",
    type: "text",
    answer: "野菜",
    explanation: "やさい = 野菜（や＝野、さい＝菜）",
    difficulty: 1,
    tags: ["漢字", "変換"],
  },
  {
    id: "r6-jp-kanji-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "kanji",
    title: "漢字→ひらがな変換④",
    questionText: "次の漢字をひらがなに直しなさい。\n「感想文」を書く。",
    type: "text",
    answer: "かんそうぶん",
    explanation: "感想文 = かんそうぶん（感＝かん、想＝そう、文＝ぶん）",
    difficulty: 2,
    tags: ["漢字", "読み"],
  },
  {
    id: "r6-jp-kanji-5",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "kanji",
    title: "漢字→ひらがな変換⑤",
    questionText: "次の漢字をひらがなに直しなさい。\n「体調」が良い。",
    type: "text",
    answer: "たいちょう",
    explanation: "体調 = たいちょう（体＝たい、調＝ちょう）",
    difficulty: 1,
    tags: ["漢字", "読み"],
  },
  {
    id: "r6-jp-kanji-6",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "kanji",
    title: "漢字→ひらがな変換⑥",
    questionText: "次の漢字をひらがなに直しなさい。\n「図書館」へ行く。",
    type: "text",
    answer: "としょかん",
    explanation: "図書館 = としょかん（図＝と、書＝しょ、館＝かん）",
    difficulty: 1,
    tags: ["漢字", "読み"],
  },

  // 大問2: ローマ字→ひらがな
  {
    id: "r6-jp-roman-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "roman",
    title: "ローマ字→ひらがな変換①",
    questionText: "次のローマ字をひらがなに直しなさい。\nKumamoto",
    type: "text",
    answer: "くまもと",
    explanation: "Kumamoto = くまもと（熊本）",
    difficulty: 1,
    tags: ["ローマ字"],
  },
  {
    id: "r6-jp-roman-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "roman",
    title: "ローマ字→ひらがな変換②",
    questionText: "次のローマ字をひらがなに直しなさい。\nzikken",
    type: "text",
    answer: "じっけん",
    explanation: "zikken = じっけん（実験）。「kk」は小さい「っ」（促音）を表す。",
    difficulty: 2,
    tags: ["ローマ字", "促音"],
  },
  {
    id: "r6-jp-roman-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "roman",
    title: "ローマ字→ひらがな変換③",
    questionText: "次のローマ字をひらがなに直しなさい。\nhappa",
    type: "text",
    answer: "はっぱ",
    explanation: "happa = はっぱ（葉っぱ）。「pp」は小さい「っ」（促音）を表す。",
    difficulty: 2,
    tags: ["ローマ字", "促音"],
  },
  {
    id: "r6-jp-roman-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "roman",
    title: "ローマ字→ひらがな変換④",
    questionText: "次のローマ字をひらがなに直しなさい。\ngyouda",
    type: "text",
    answer: "ぎょうだ",
    explanation: "gyouda = ぎょうだ（行田）。「gy」は「ぎゃ行」を表す。",
    difficulty: 2,
    tags: ["ローマ字"],
  },

  // 大問3: 送りがな
  {
    id: "r6-jp-conjugation-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "conjugation",
    title: "送りがな①（分か□る）",
    questionText: "□にひらがな一文字を入れて、正しい送りがなにしなさい。\n「算数の問題が分か□。」",
    type: "text",
    answer: "る",
    explanation: "「分かる」の送りがなは「る」。分か**る**が正しい形。",
    difficulty: 1,
    tags: ["送りがな", "活用形"],
  },
  {
    id: "r6-jp-conjugation-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "conjugation",
    title: "送りがな②（鳴ら□す）",
    questionText: "□にひらがな一文字を入れて、正しい送りがなにしなさい。\n「平和のかねを鳴□す。」",
    type: "text",
    answer: "ら",
    explanation: "「鳴らす」の送りがなは「ら」。鳴**ら**すが正しい形。",
    difficulty: 2,
    tags: ["送りがな", "活用形"],
  },
  {
    id: "r6-jp-conjugation-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "conjugation",
    title: "送りがな③（向け□る）",
    questionText: "□にひらがな一文字を入れて、正しい送りがなにしなさい。\n「顔を前に向け□。」",
    type: "text",
    answer: "る",
    explanation: "「向ける」の送りがなは「る」。向け**る**が正しい形。",
    difficulty: 1,
    tags: ["送りがな", "活用形"],
  },
  {
    id: "r6-jp-conjugation-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "conjugation",
    title: "送りがな④（少な□い）",
    questionText: "□にひらがな一文字を入れて、正しい送りがなにしなさい。\n「晴れの日が少な□。」",
    type: "text",
    answer: "い",
    explanation: "「少ない」の送りがなは「い」。少な**い**が正しい形。",
    difficulty: 1,
    tags: ["送りがな", "活用形"],
  },

  // 大問4: 慣用句「気が___」
  {
    id: "r6-jp-idiom-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "idiom",
    title: "慣用句「気が___」①",
    questionText: "「気が___。」\n意味：何かと先を急ぐ、せっかちである。\n（ちる・はやい・きく・ながい・つよい・よわい）から選びなさい。",
    type: "single_choice",
    choices: ["ちる", "はやい", "きく", "ながい", "つよい", "よわい"],
    answer: "はやい",
    explanation: "「気がはやい」は「何かと先を急ぐ、せっかちである」という意味の慣用句。",
    difficulty: 2,
    tags: ["慣用句", "気"],
  },
  {
    id: "r6-jp-idiom-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "idiom",
    title: "慣用句「気が___」②",
    questionText: "「気が___。」\n意味：細かいところに注意が行き届く。\n（ちる・はやい・きく・ながい・つよい・よわい）から選びなさい。",
    type: "single_choice",
    choices: ["ちる", "はやい", "きく", "ながい", "つよい", "よわい"],
    answer: "きく",
    explanation: "「気がきく」は「細かいところに注意が行き届く」という意味の慣用句。",
    difficulty: 2,
    tags: ["慣用句", "気"],
  },
  {
    id: "r6-jp-idiom-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "idiom",
    title: "慣用句「気が___」③",
    questionText: "「気が___。」\n意味：一つのことに集中できない。\n（ちる・はやい・きく・ながい・つよい・よわい）から選びなさい。",
    type: "single_choice",
    choices: ["ちる", "はやい", "きく", "ながい", "つよい", "よわい"],
    answer: "ちる",
    explanation: "「気がちる」は「一つのことに集中できない」という意味の慣用句。",
    difficulty: 2,
    tags: ["慣用句", "気"],
  },
  {
    id: "r6-jp-idiom-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "idiom",
    title: "慣用句「気が___」④",
    questionText: "「気が___。」\n意味：のんびりしていて、いらいらしない。\n（ちる・はやい・きく・ながい・つよい・よわい）から選びなさい。",
    type: "single_choice",
    choices: ["ちる", "はやい", "きく", "ながい", "つよい", "よわい"],
    answer: "ながい",
    explanation: "「気がながい」は「のんびりしていて、いらいらしない」という意味の慣用句。",
    difficulty: 2,
    tags: ["慣用句", "気"],
  },
  {
    id: "r6-jp-idiom-5",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "idiom",
    title: "慣用句「気が___」⑤",
    questionText: "「気が___。」\n意味：自信が持てず、消極的である。\n（ちる・はやい・きく・ながい・つよい・よわい）から選びなさい。",
    type: "single_choice",
    choices: ["ちる", "はやい", "きく", "ながい", "つよい", "よわい"],
    answer: "よわい",
    explanation: "「気がよわい」は「自信が持てず、消極的である」という意味の慣用句。",
    difficulty: 2,
    tags: ["慣用句", "気"],
  },

  // 大問5: 助詞
  {
    id: "r6-jp-particle-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "particle",
    title: "文中の助詞①",
    questionText: "次の文章の（　）に入る助詞を「に・を・の・や・が・と」から選びなさい。\n「鳥は空をとぶため、ほね（①）数や形などをかえました。」\n①に入る助詞は何ですか。",
    type: "single_choice",
    choices: ["に", "を", "の", "や", "が", "と"],
    answer: "の",
    explanation: "「ほねの数や形」の「の」は所属・関係を示す助詞。",
    difficulty: 1,
    tags: ["助詞"],
  },
  {
    id: "r6-jp-particle-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "particle",
    title: "文中の助詞②",
    questionText: "次の文章の（　）に入る助詞を「に・を・の・や・が・と」から選びなさい。\n「ほかの鳥（②）同じ仕組みです。」\n②に入る助詞は何ですか。",
    type: "single_choice",
    choices: ["に", "を", "の", "や", "が", "と"],
    answer: "と",
    explanation: "「ほかの鳥と同じ仕組み」の「と」は比較・対象を示す助詞。",
    difficulty: 2,
    tags: ["助詞"],
  },
  {
    id: "r6-jp-particle-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "particle",
    title: "文中の助詞③",
    questionText: "次の文章の（　）に入る助詞を「に・を・の・や・が・と」から選びなさい。\n「ペンギン（③）ほねも、ほかの鳥と同じ仕組みです。」\n③に入る助詞は何ですか。",
    type: "single_choice",
    choices: ["に", "を", "の", "や", "が", "と"],
    answer: "の",
    explanation: "「ペンギンのほね」の「の」は所属・関係を示す助詞。",
    difficulty: 1,
    tags: ["助詞"],
  },
  {
    id: "r6-jp-particle-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "particle",
    title: "文中の助詞④",
    questionText: "次の文章の（　）に入る助詞を「に・を・の・や・が・と」から選びなさい。\n「ペンギンは海にもぐるために、体（④）重くなっていることを知っておどろきました。」\n④に入る助詞は何ですか。",
    type: "single_choice",
    choices: ["に", "を", "の", "や", "が", "と"],
    answer: "が",
    explanation: "「体が重くなっている」の「が」は主語を示す助詞。",
    difficulty: 1,
    tags: ["助詞"],
  },

  // 大問6: 長文読解「水道水」
  {
    id: "r6-jp-reading-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "reading",
    title: "長文読解「水道水」問1",
    questionText: `【文章】
浄水場の職員の方々は、交代をしながら、毎日二十四時間、一秒も休まずに働いています。水道水がきちんと作られているかどうか、機器をかん視するためだそうです。

【問い】
浄水場の職員が交代しながら毎日一秒も休まずに働く理由は何ですか。次のア～エから一つ選びなさい。
ア：失敗できないため
イ：機器をかん視するため
ウ：仕事が忙しいため
エ：眠れないため`,
    type: "single_choice",
    choices: [
      "ア　失敗できないため",
      "イ　機器をかん視するため",
      "ウ　仕事が忙しいため",
      "エ　眠れないため",
    ],
    answer: "イ　機器をかん視するため",
    explanation: "文章中に「水道水がきちんと作られているかどうか、機器をかん視するためだそうです」とある。",
    difficulty: 1,
    tags: ["読解", "選択"],
  },
  {
    id: "r6-jp-reading-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "reading",
    title: "長文読解「水道水」問2",
    questionText: `【文章】
水道水は、主に山に降った雨や雪から作られています。山に降った雨や雪は、川に流れていきます。川の水をくみ取って、パイプを通して浄水場まで送り、浄水場で水道水を作っているのです。

【問い】
水道水は主に何から作られていますか。`,
    type: "text",
    answer: "山に降った雨や雪",
    explanation: "文章中に「水道水は、主に山に降った雨や雪から作られています」とある。",
    difficulty: 1,
    tags: ["読解", "抜き出し"],
  },
  {
    id: "r6-jp-reading-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "reading",
    title: "長文読解「水道水」問3（着水井）",
    questionText: `【文章】
浄水場に送られてきた水は、最初は着水井に届きます。着水井では、活性炭を使って、水からにおいを取り除きます。

【問い】
着水井では何を使って、水から何を取り除きますか。（空欄）
「（　　）を使って、水から（　　）を取り除く。」`,
    type: "text",
    answer: ["活性炭", "におい"],
    explanation: "「着水井では、活性炭を使って、水からにおいを取り除きます」とある。",
    difficulty: 2,
    tags: ["読解", "抜き出し"],
  },
  {
    id: "r6-jp-reading-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "reading",
    title: "長文読解「水道水」問4（ちんでん池）",
    questionText: `【文章】
においを取り除かれた水は、次にちんでん池に送られます。ちんでん池では、水に薬品を混ぜます。薬品は、水の中の大きな汚れとくっついて、ちんでん池の底にしずむようになっています。

【問い】
ちんでん池では何をして、何を取り除きますか。
「水に（　　）を混ぜ、（　　）をおとす。」`,
    type: "text",
    answer: ["薬品", "大きな汚れ"],
    explanation: "「ちんでん池では、水に薬品を混ぜます。薬品は、水の中の大きな汚れとくっついて…底にしずむ」とある。",
    difficulty: 2,
    tags: ["読解", "抜き出し"],
  },
  {
    id: "r6-jp-reading-5",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "reading",
    title: "長文読解「水道水」問5（ろ過池）",
    questionText: `【文章】
大きな汚れが取り除かれた水は、今度はろ過池に送られます。ろ過池では、水を砂の中に通します。砂の中に通すことで、ちんでん池で取り除けなかった小さな汚れを取り除くことができます。

【問い】
ろ過池では何を使って、何を取り除きますか。
「水を（　　）に通し、（　　）を取り除く。」`,
    type: "text",
    answer: ["砂の中", "小さな汚れ"],
    explanation: "「ろ過池では、水を砂の中に通します。小さな汚れを取り除くことができます」とある。",
    difficulty: 2,
    tags: ["読解", "抜き出し"],
  },
  {
    id: "r6-jp-reading-6",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "reading",
    title: "長文読解「水道水」問6（消毒）",
    questionText: `【文章】
最後は、消毒を行う施設で、塩素を入れて消毒します。これでようやく水道水が完成します。

【問い】
消毒の工程では何を入れますか。`,
    type: "text",
    answer: "塩素",
    explanation: "「消毒を行う施設で、塩素を入れて消毒します」とある。",
    difficulty: 1,
    tags: ["読解", "抜き出し"],
  },

  // 大問7: 電子メールの注意
  {
    id: "r6-jp-document-1",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "電子メール①：あて先の別称",
    questionText: `【文章】
電子メールを送るときは、相手のアドレス（メールのあて先）を正しく入力しましょう。

電子メールのあて先のことを別の言葉では何と言いますか。`,
    type: "text",
    answer: "アドレス",
    explanation: "「相手のアドレス（メールのあて先）」とある。",
    difficulty: 1,
    tags: ["文書読解", "電子メール"],
  },
  {
    id: "r6-jp-document-2",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "電子メール②：添付できるもの",
    questionText: `【文章】
電子メールには文章のほかに、絵や写真などをそえて送ることができます。

電子メールにそえて送ることができるものは何ですか。`,
    type: "text",
    answer: "絵や写真",
    explanation: "「絵や写真などをそえて送ることができます」とある。",
    difficulty: 1,
    tags: ["文書読解", "電子メール"],
  },
  {
    id: "r6-jp-document-3",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "電子メール③：小さな画面での工夫（正しくないもの）",
    questionText: `【文章】
小さな画面でも見やすいように、次の工夫をしましょう。
・文は短めにする
・必要なところは漢字に直す
・点や丸をきちんと打つ
・だんらくを分ける

正しくないものを次のア～エから一つ選びなさい。
ア：文は短めにする
イ：必要なところは漢字に直す
ウ：点や丸をきちんと打つ
エ：だんらくを分けない`,
    type: "single_choice",
    choices: [
      "ア　文は短めにする",
      "イ　必要なところは漢字に直す",
      "ウ　点や丸をきちんと打つ",
      "エ　だんらくを分けない",
    ],
    answer: "エ　だんらくを分けない",
    explanation: "「だんらくを分ける」が正しい工夫。「だんらくを分けない」は誤りなのでエが答え。",
    difficulty: 2,
    tags: ["文書読解", "電子メール", "選択"],
  },
  {
    id: "r6-jp-document-4",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "電子メール④：絶対に開かないメール",
    questionText: `【文章】
心あたりのない電子メールは、ぜったいに開かないようにしましょう。

ぜったいに開かない電子メールとはどのようなものですか。`,
    type: "text",
    answer: "心あたりのない電子メール",
    explanation: "「心あたりのない電子メールは、ぜったいに開かないようにしましょう」とある。",
    difficulty: 1,
    tags: ["文書読解", "電子メール"],
  },

  // 大問8: ふうとうの書き方
  {
    id: "r6-jp-document-5",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "封筒の書き方①（郵便番号欄）",
    questionText: `【封筒の書き方】
封筒には次のように書きます。
①七つ並んだ四角の枠には郵便番号を書く
②相手の住所を1〜2行で書く
③中央には相手の氏名を書く
④住所よりやや大きめに書く
⑤たてがきで数字を書くときは漢数字で書く

①七つ並んだ四角の枠には何を書きますか。次から選びなさい。
ア：氏名　イ：住所　ウ：郵便番号　エ：電話番号　オ：大きめ　キ：漢数字`,
    type: "single_choice",
    choices: ["ア　氏名", "イ　住所", "ウ　郵便番号", "エ　電話番号"],
    answer: "ウ　郵便番号",
    explanation: "七つ並んだ四角の枠は郵便番号欄。郵便番号（例：123-4567）を書く。",
    difficulty: 1,
    tags: ["文書読解", "封筒"],
  },
  {
    id: "r6-jp-document-6",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "封筒の書き方②（住所）",
    questionText: `【封筒の書き方】
②相手の（　）を1〜2行で書きます。

②の（　）に入る言葉を次から選びなさい。
ア：氏名　イ：住所　ウ：郵便番号　エ：電話番号`,
    type: "single_choice",
    choices: ["ア　氏名", "イ　住所", "ウ　郵便番号", "エ　電話番号"],
    answer: "イ　住所",
    explanation: "封筒の②は相手の住所を書く欄。",
    difficulty: 1,
    tags: ["文書読解", "封筒"],
  },
  {
    id: "r6-jp-document-7",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "封筒の書き方③（氏名）",
    questionText: `【封筒の書き方】
③中央には相手の（　）を書きます。

③の（　）に入る言葉を次から選びなさい。
ア：氏名　イ：住所　ウ：郵便番号　エ：電話番号`,
    type: "single_choice",
    choices: ["ア　氏名", "イ　住所", "ウ　郵便番号", "エ　電話番号"],
    answer: "ア　氏名",
    explanation: "封筒の中央には相手の氏名（名前）を書く。",
    difficulty: 1,
    tags: ["文書読解", "封筒"],
  },
  {
    id: "r6-jp-document-8",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "封筒の書き方④（大きさ）",
    questionText: `【封筒の書き方】
④住所よりやや（　）に書きます。

④の（　）に入る言葉を次から選びなさい。
ア：小さめ　イ：同じ大きさ　ウ：大きめ　エ：細め`,
    type: "single_choice",
    choices: ["ア　小さめ", "イ　同じ大きさ", "ウ　大きめ", "エ　細め"],
    answer: "ウ　大きめ",
    explanation: "封筒では氏名は住所よりやや大きめに書く。",
    difficulty: 1,
    tags: ["文書読解", "封筒"],
  },
  {
    id: "r6-jp-document-9",
    subject: "japanese",
    year: "R6",
    sourceType: "past_exam",
    category: "document",
    title: "封筒の書き方⑤（漢数字）",
    questionText: `【封筒の書き方】
⑤たてがきで数字を書くときは（　）で書きます。

⑤の（　）に入る言葉を次から選びなさい。
ア：アラビア数字　イ：ローマ数字　ウ：漢数字　エ：ひらがな`,
    type: "single_choice",
    choices: ["ア　アラビア数字", "イ　ローマ数字", "ウ　漢数字", "エ　ひらがな"],
    answer: "ウ　漢数字",
    explanation: "たてがき（縦書き）で数字を書くときは漢数字（一、二、三…）を使う。",
    difficulty: 1,
    tags: ["文書読解", "封筒", "漢数字"],
  },
];

export default r6JapaneseQuestions;
