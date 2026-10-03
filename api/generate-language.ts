// --- Local Types ---
import type { GeneratedLanguageContent } from '../src/types/language';

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

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const generateContents = async (
  generateCount: number,
): Promise<GeneratedLanguageContent[]> => {
  const selectedLanguages = [...languages]
    .sort(() => Math.random() - 0.5)
    .slice(0, generateCount);

  let response;

  try {
    response = await ai.interactions.create({
      model: 'gemini-3.5-flash-lite',
      input: `
      外国語学習用のコンテンツを${generateCount}件生成してください。
      
      以下の3言語について、それぞれ1件ずつ生成してください。
      ${selectedLanguages.map((language) => `- ${language}`).join('\n')}

      ${generateCount}件は、言語だけでなく、場面・話題・文の内容も互いに異なるものにしてください。

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

      上記のオブジェクトを${generateCount}件含むJSON配列を返してください。
      配列の各要素は、指定された${generateCount}言語に1対1で対応させてください。

      expressions は、重要な表現だけでなく、元の文章 text 全体を学習できるように分割してください。
      expressions の text を元の文章の順番に並べたとき、元の文章のすべての語句が含まれるようにしてください。
      冠詞や形容詞なども省略しないでください。

      pronunciationParts は音節や文字単位には分割しないでください。
      学習者が聞き取り練習をしやすい、自然な語またはフレーズ単位で分割してください。
      短く分割しすぎず、1つの単語を複数の要素に分割しないでください。
      分割が不要な表現は、expression.text 全体を1要素として入れてください。
    `,
    });
  } catch (error) {
    console.error('Failed to generate language content:', error);
    throw new Error('Failed to generate language content', { cause: error });
  }

  let parsed: unknown;

  try {
    if (!response.output_text) {
      throw new Error('Gemini response is empty');
    }

    parsed = JSON.parse(response.output_text);
  } catch (error) {
    console.error('Failed to parse Gemini response:', error);
    throw new Error('Failed to parse Gemini response', { cause: error });
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Invalid Gemini response');
  }

  const isValidContent = parsed.every(
    (content) =>
      typeof content === 'object' &&
      content !== null &&
      typeof content.text === 'string' &&
      typeof content.translation === 'string' &&
      typeof content.language === 'string' &&
      Array.isArray(content.expressions) &&
      content.expressions.every(
        (expression: unknown) =>
          isObject(expression) &&
          typeof expression.text === 'string' &&
          typeof expression.meaning === 'string' &&
          typeof expression.explanation === 'string' &&
          Array.isArray(expression.pronunciationParts) &&
          expression.pronunciationParts.every(
            (part) => typeof part === 'string',
          ),
      ),
  );

  if (!isValidContent) {
    console.error('Invalid Gemini response');
    throw new Error('Invalid Gemini response');
  }

  return parsed as GeneratedLanguageContent[];
};

const generateLanguage = async (generateCount = 3): Promise<Response> => {
  const maxRetryCount = 3;
  let retryCount = 0;

  const { data: existingContents, error: selectError } = await supabase
    .from('language_contents')
    .select('text');

  if (selectError) {
    console.error('Failed to get existing language contents:', selectError);

    return Response.json(
      { error: 'Failed to get existing language contents' },
      { status: 500 },
    );
  }

  const existingTexts = new Set(
    existingContents.map((content) => content.text),
  );

  let contents: GeneratedLanguageContent[];

  try {
    contents = await generateContents(generateCount);
  } catch (error) {
    console.error('Language generation failed:', error);

    return Response.json(
      { error: 'Language generation failed' },
      { status: 500 },
    );
  }

  const generatedTexts = new Set<string>();

  let newContents = contents.filter((content) => {
    if (existingTexts.has(content.text) || generatedTexts.has(content.text)) {
      return false;
    }

    generatedTexts.add(content.text);
    return true;
  });

  while (newContents.length < generateCount && retryCount < maxRetryCount) {
    retryCount += 1;

    const remainingCount = generateCount - newContents.length;

    console.log(
      `Retrying language generation: attempt ${retryCount}/${maxRetryCount}, generating ${remainingCount} content(s)`,
    );

    let regeneratedContents: GeneratedLanguageContent[];

    try {
      regeneratedContents = await generateContents(remainingCount);
    } catch (error) {
      console.error('Language regeneration failed:', error);

      return Response.json(
        { error: 'Language regeneration failed' },
        { status: 500 },
      );
    }

    const uniqueRegeneratedContents = regeneratedContents.filter((content) => {
      if (existingTexts.has(content.text) || generatedTexts.has(content.text)) {
        return false;
      }

      generatedTexts.add(content.text);
      return true;
    });

    newContents = [...newContents, ...uniqueRegeneratedContents];
  }

  if (newContents.length < generateCount) {
    console.warn(
      `Language generation completed with only ${newContents.length}/${generateCount} unique content(s)`,
    );
  }

  const { error } = await supabase.from('language_contents').insert(
    newContents.map((content) => ({
      text: content.text,
      translation: content.translation,
      language: content.language,
      expressions: content.expressions,
    })),
  );

  if (error) {
    console.error('Failed to save language content:', error);

    return Response.json(
      { error: 'Failed to save language content' },
      { status: 500 },
    );
  }

  console.log(
    `Language generation succeeded: ${newContents.length} contents saved`,
  );

  return new Response(JSON.stringify(newContents), {
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
