// --- Local Types ---
import type { LanguageContent } from '../src/types/language';

// --- Others ---
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

const languages = ['English', 'French', 'German', 'Italian', 'Spanish'];

const generateLanguage = async (): Promise<Response> => {
  const selectedLanguages = [...languages]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const response = await ai.interactions.create({
    model: 'gemini-3.5-flash-lite',
    input: `
      外国語学習用のコンテンツを3件生成してください。
      
      以下の3言語について、それぞれ1件ずつ生成してください。
      ${selectedLanguages.map((language) => `- ${language}`).join('\n')}

      3件は、言語だけでなく、場面・話題・文の内容も互いに異なるものにしてください。

      次のJSON形式だけを返してください。
      Markdownやコードブロックは付けないでください。

      [
        {
          "text": "学習する外国語の一文",
          "translation": "自然な日本語訳",
          "language": "BCP-47形式の言語コード (例示はせず、地域を含むロケールを指定)",
          "expressions": [
            {
              "text": "文中の重要な表現",
              "meaning": "日本語での意味",
              "explanation": "初心者向けの簡潔な説明",
              "pronunciationParts": ["発音練習用に分割した文字列"]
            }
          ]
        }
      ]

      上記のオブジェクトを3件含むJSON配列を返してください。
      配列の各要素は、指定された3言語に1対1で対応させてください。

      expressions は、重要な表現だけでなく、元の文章 text 全体を学習できるように分割してください。
      expressions の text を元の文章の順番に並べたとき、元の文章のすべての語句が含まれるようにしてください。
      冠詞や形容詞なども省略しないでください。

      pronunciationParts は音節や文字単位には分割しないでください。
      学習者が聞き取り練習をしやすい、自然な語またはフレーズ単位で分割してください。
      短く分割しすぎず、1つの単語を複数の要素に分割しないでください。
      分割が不要な表現は、expression.text 全体を1要素として入れてください。
    `,
  });

  if (!response.output_text) {
    return Response.json(
      { error: 'Language content was not returned' },
      { status: 502 },
    );
  }

  const contents: LanguageContent[] = JSON.parse(response.output_text);

  const { error } = await supabase.from('language_contents').insert(
    contents.map((content) => ({
      text: content.text,
      translation: content.translation,
      language: content.language,
      expressions: content.expressions,
    })),
  );

  if (error) {
    console.error(error);

    return Response.json(
      { error: 'Failed to save language content' },
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(contents), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export async function POST(request: Request): Promise<Response> {
  const authorization = request.headers.get('authorization');

  if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return generateLanguage();
}

export async function GET(request: Request): Promise<Response> {
  const authorization = request.headers.get('authorization');

  if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return generateLanguage();
}
