"use client";

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

export default function MyNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // News API から記事を取得する関数
  const fetchNewsArticles = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      // 例として米国のトップヘッドラインを 10 件取得
      const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
      const res = await fetch(newsApiUrl);
      if (!res.ok) throw new Error('News API の取得に失敗しました');
      const data = await res.json();
      setArticles(data.articles);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ページ読み込み時にニュース記事を取得
  useEffect(() => {
    fetchNewsArticles();
  }, []);

  // 選択した記事を API 経由で Supabase の bloglist に追加する処理
  const addArticle = async (article: NewsArticle) => {
    try {
      setMessage('記事を追加中...');
      const res = await fetch('../api/add-news-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uuidv4(),
          title: article.title,
          description: article.description,
          url: article.url,
          image_url: article.urlToImage,
          published_at: article.publishedAt,
        }),
      });
      if (!res.ok) throw new Error('記事の登録に失敗しました');
      const result = await res.json();
      setMessage(result.message || '記事が追加されました');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">News API 記事一覧</h1>
      {loading && <p>読み込み中...</p>}
      {message && <p className="mt-4">{message}</p>}
      <ul className="mt-4 space-y-4">
        {articles.map((article, index) => (
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
            <p className="text-sm text-gray-500 mt-2">
              発行日: {new Date(article.publishedAt).toLocaleString()}
            </p>
            <button
              onClick={() => addArticle(article)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              この記事を追加
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}