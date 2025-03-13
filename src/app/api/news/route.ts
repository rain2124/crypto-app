// app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'NewsAPI の API キーが設定されていません。' },
      { status: 500 }
    );
  }
  const language = 'en';
  const q = 'crypto';
  const pageSize = '10';
  const apiUrl = `https://newsapi.org/v2/everything?language=${language}&pageSize=${pageSize}&q=${q}&apiKey=${apiKey}`;
  const response = await fetch(apiUrl, {
    next: { revalidate: 600 }
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'ニュースデータの取得に失敗しました。' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}