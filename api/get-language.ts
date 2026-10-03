// --- Others ---
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const excludeId = url.searchParams.get('excludeId');

  let query = supabase.from('language_contents').select('*');

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);

    return Response.json(
      { error: 'Failed to get language content' },
      { status: 500 },
    );
  }

  if (data.length === 0) {
    return Response.json(
      { error: 'Language content not found' },
      { status: 404 },
    );
  }

  const content = data[Math.floor(Math.random() * data.length)];

  return new Response(JSON.stringify(content), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
