// app/api/add-blog-article/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    // リクエストボディから記事情報を受け取る
    const body = await request.json();
    const { title, description, url, image_url, published_at } = body;
    if (!title || !url) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 });
    }

    // Supabase クライアントの初期化（サービスロールキーはサーバー専用）
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // テーブルに記事を追加
    const { data, error } = await supabase
      .from('mynews')
      .insert([{ title, description, url, image_url, published_at }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: '記事が追加されました', data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}