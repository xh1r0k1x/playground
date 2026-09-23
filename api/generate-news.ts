// --- Others ---
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request): Promise<Response> {
  const news = await request.json();

  if (
    !Array.isArray(news) ||
    news.length !== 3 ||
    !news.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.title === 'string' &&
        item.title.length <= 500 &&
        typeof item.description === 'string' &&
        item.description.length <= 2000,
    )
  ) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const newsText = news
    .map(
      (item: { title: string; description: string }, index: number) => `
    ニュース${index + 1}

    タイトル:
    ${item.title}

    概要:
    ${item.description}
  `,
    )
    .join('\n');

  const response = await ai.interactions.create({
    model: 'gemini-3.5-flash-lite',
    input: `
        次の3件の英語ニュースそれぞれについて、日本語で30秒程度で読める短いニュース記事を書いてください。
        専門知識がない人でも「へえ、そうなんだ」と思えるように、背景や意味が伝わる自然な文章にしてください。
        「～というニュースです」「～という内容です」のような要約調の表現は避けてください。
        与えられた情報にない具体的な事実は推測で補わないでください。
        出力は必ず次の形式のJSON配列だけにしてください。
        Markdownのコードブロックや説明文は付けないでください。

        ["ニュース1の記事", "ニュース2の記事", "ニュース3の記事"]
        
        ${newsText}
        `,
  });

  return Response.json({ outputText: response.output_text });
}
