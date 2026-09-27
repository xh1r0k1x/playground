// --- Local Types ---
import type { LanguageContent } from '@/types/language';

export const languageContents: LanguageContent[] = [
  {
    id: 'fr-001',
    text: "J'ai hâte de te revoir.",
    translation: 'また会えるのを楽しみにしています。',
    language: 'fr-FR',
    expressions: [
      {
        text: "J'ai hâte de",
        meaning: '～するのを楽しみにする、待ちきれない',
        explanation:
          "J'ai は Je + ai の形。ai は avoir (持つ) の活用形です。\navoir hâte de で「～するのを楽しみにする」という表現です。",
        pronunciationParts: ["J'ai", 'hâte de'],
      },
      {
        text: 'te revoir',
        meaning: 'あなたにまた会う',
        explanation: 'te は「あなたに」、revoir は「また会う」という意味です。',
        pronunciationParts: ['te revoir'],
      },
    ],
  },
];
