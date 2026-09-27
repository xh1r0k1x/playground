// --- Others ---
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function GET(): Promise<Response> {
  const { data, error } = await supabase.from('language_contents').select('*');

  if (error) {
    console.error(error);

    return Response.json(
      { error: 'Failed to get language content' },
      { status: 500 },
    );
  }

  const content = data[Math.floor(Math.random() * data.length)];

  return new Response(JSON.stringify(content), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
