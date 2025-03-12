// app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'NewsAPI の API キーが設定されていません。' },
      { status: 500 }
    );
  }
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    return NextResponse.json(
      { error: 'ニュースデータの取得に失敗しました。' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}