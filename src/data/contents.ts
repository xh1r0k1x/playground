export type Content = {
  id: string;
  title: string;
  body: string;
  type: string;
};

export const contents: Content[] = [
  {
    id: 'history-nobunaga-europe',
    title: '信長が生きていた頃、ヨーロッパでは何が起きていた？',
    body: '信長と同時代のヨーロッパについて紹介するコンテンツ。',
    type: 'history',
  },
  {
    id: 'language-spanish-playa',
    title: 'Me encanta la playa.',
    body: '「私はビーチが大好きです」という意味のスペイン語表現。',
    type: 'language',
  },
  {
    id: 'science-airplane-window',
    title: '飛行機の窓はなぜ丸い？',
    body: '飛行機の窓が丸みを帯びた形になっている理由を紹介するコンテンツ。',
    type: 'science',
  },
];
