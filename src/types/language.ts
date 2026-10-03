export type LanguageExpression = {
  text: string;
  meaning: string;
  explanation: string;
  pronunciationParts: string[];
};

export type LanguageContent = {
  id: number;
  text: string;
  translation: string;
  language: string;
  expressions: LanguageExpression[];
};

export type GeneratedLanguageContent = {
  text: string;
  translation: string;
  language: string;
  expressions: LanguageExpression[];
};
