export type LanguageExpression = {
  text: string;
  meaning: string;
  explanation: string;
  pronunciationParts: string[];
};

export type LanguageContent = {
  id: string;
  text: string;
  translation: string;
  language: string;
  expressions: LanguageExpression[];
};
