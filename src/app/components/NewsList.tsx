// app/page.tsx
import React from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

interface NewsResponse {
  articles: Article[];
  totalResults: number;
}

export default async function NewsList() {
  // .env.local に API キーを設定しておく（公開する必要がない場合は NEXT_PUBLIC_ を外す）
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // サーバー側で利用するため、NEXT_PUBLIC_ でなくてもOK
  const language = 'en';
  const q = 'crypto';
  const pageSize = '10';
  const res = await fetch(
    `https://newsapi.org/v2/everything?language=${language}&pageSize=${pageSize}&q=${q}&apiKey=${apiKey}`
  );
  // エラー処理（必要に応じて詳細なエラーハンドリングを実装）
  if (!res.ok) {
    throw new Error('ニュースの取得に失敗しました');
  }
  const data: NewsResponse = await res.json();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">最新ニュース</h1>
      {data.articles.length > 0 ? (
        <ul className="space-y-4">
          {data.articles.map((article, index) => (
            <li key={index} className="border p-4">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="mt-2 max-w-full"
                />
              )}
              <p className="mt-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                記事を読む
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>記事が見つかりませんでした。</p>
      )}
    </div>
  );
}