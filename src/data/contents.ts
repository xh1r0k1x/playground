export type ContentType = 'history' | 'language' | 'trivia';

export type Content = {
  id: string;
  title: string;
  body: string;
  type: ContentType;
};

export const contentTypeLabels: Record<ContentType, string> = {
  history: '歴史',
  language: '言語',
  trivia: '雑学',
};

export const contents: Content[] = [
  {
    id: 'history-nobunaga-europe',
    title: '信長が生きていた頃、ヨーロッパでは何が起きていた？',
    body: '織田信長が天下統一を進めていた16世紀後半、イングランドではエリザベス1世が統治していました。つまり「戦国時代の日本」と「エリザベス朝のイングランド」は、実は同じ時代です。日本では鉄砲を使った戦いが広がる一方、ヨーロッパでも宗教対立や国家間の争いが続いていました。',
    type: 'history',
  },
  {
    id: 'language-spanish-playa',
    title: 'Me encanta la playa.',
    body: '「Me encanta la playa.」は「私はビーチが大好きです」という意味です。encanta は「～が大好き・とても気に入っている」、la playa は「ビーチ・海辺」。英語の I love the beach. に近い表現です。',
    type: 'language',
  },
  {
    id: 'science-airplane-window',
    title: '飛行機の窓はなぜ丸い？',
    body: '飛行機の窓が丸みを帯びているのは、機体にかかる力を分散しやすくするためです。角のある窓では、角の部分に力が集中しやすく、金属疲労による亀裂の原因になります。そのため現在の旅客機では、角を丸くした窓が使われています。',
    type: 'trivia',
  },
];
