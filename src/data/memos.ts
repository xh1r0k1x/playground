export type MemoItem = {
  title: string;
  solution: string;
  cause: string;
  tags?: string[];
};

export const memos: MemoItem[] = [
  {
    title: 'VS CodeでformatOnSaveが効かない',
    solution: 'プロジェクトフォルダ自体をVS Codeのワークスペースとして開く。',
    cause:
      '.vscode/settings.json は、そのプロジェクトをVS Codeのワークスペースとして開いていないと適用されない。',
    tags: ['VS Code', '設定'],
  },
  {
    title: 'MUIのレイアウトが意図せず中央寄せになる',
    solution: 'グローバルCSSの#rootに不要なスタイルが残っていないか確認する。',
    cause: 'Viteの初期CSSにあったtext-align: centerが子要素にも影響していた。',
    tags: ['MUI', 'CSS'],
  },
  {
    title: 'MUIのCardとListの使い分け',
    solution:
      '一覧として連続して見せたい情報はList、各項目を独立したコンテンツとして見せたい場合はCardを検討する。',
    cause:
      'CardはChip・操作ボタン・画像などを含む独立した情報のまとまりと相性がよく、Listは同種の項目を一覧として並べるのに向いている。',
    tags: ['MUI', '設計'],
  },
  {
    title: 'React / TypeScript で波かっこの意味を見分ける',
    solution:
      '記号だけで判断せず、今いる場所がJavaScript、JSX、型定義のどこなのかを見る。',
    cause:
      '波かっこ{}は、JavaScriptではブロックやオブジェクト、JSXではJavaScript式の埋め込み、TypeScriptでは型の構造など、文脈によって役割が変わる。',
    tags: ['React', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'TSXで丸かっこと波かっこの役割を見分ける',
    solution:
      '丸かっこ()はJavaScriptの式をまとめるために使い、波かっこ{}はJSXの中にJavaScriptの式を埋め込むときに使う。',
    cause:
      'return (...) の()はJSXに入るための記号ではなく、複数行の式を読みやすくまとめているだけ。JSXは<Typography>のようなタグから始まり、その中で{value}と書くとJavaScriptの式を埋め込める。',
    tags: ['React', 'TypeScript', 'JavaScript'],
  },
  {
    title: '存在チェック後はoptional chainingを外せる',
    solution:
      '値が存在しない場合をearly returnで先に処理すると、それ以降は存在する型として扱える。',
    cause:
      'TypeScriptはif文による存在チェックをもとに型を絞り込む(narrowing)ため、early return後はundefinedの可能性が除外される。',
    tags: ['TypeScript', 'テクニック'],
  },
  {
    title: 'オブジェクトでプロパティ名と変数名が同じなら省略できる',
    solution:
      '{ searchText } は { searchText: searchText } の省略形として読める。',
    cause:
      'JavaScriptでは、オブジェクトのプロパティ名と代入する変数名が同じ場合、プロパティの省略記法が使える。',
    tags: ['JavaScript', '構文'],
  },
  {
    title: '複数行のテキストを指定行数で省略する',
    solution:
      "display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' を組み合わせる。",
    cause:
      'WebkitLineClampだけでは完結せず、縦方向のboxレイアウトとoverflowの制御が必要。overflow: hiddenがないと、表示領域は制限されても後続要素にはみ出した文字が重なって見えることがある。',
    tags: ['CSS', 'MUI'],
  },
];
