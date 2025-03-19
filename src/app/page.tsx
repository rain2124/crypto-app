"use client"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "./contexts/AuthContext";
import { NewsArticle } from '../../type/Article';
import Image from 'next/image';
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { session } = useContext(AuthContext);

  // News API から記事を取得する関数
  const fetchNewsArticles = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      const language = 'en';
      const q = 'crypto';
      const pageSize = '10';
      const newsApiUrl = `https://newsapi.org/v2/everything?language=${language}&pageSize=${pageSize}&q=${q}&apiKey=${apiKey}`;
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

  // 選択した記事を API 経由で Supabase の mylist に追加する処理
  const addArticle = async (article: NewsArticle) => {
    try {
      setMessage('記事を追加中...');
      const res = await fetch('./api/add-news-article', {
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
    <>
    <div className="px-6 py-10">
      {/* sessiion test */}
      <div>ログイン状況 : {session ? <span>ログイン中</span> : <span>未ログイン</span> }</div>
      <h1 className="text-3xl font-bold mb-6">CRYPTO NEWS</h1>
      <div className='grid-cols-2 gap-6 grid md:grid-cols-3 md:gap-8'>
      {loading ? (
        <p>Loading...</p>
      ) : articles?.length > 0 ? (
        articles.map((article, idx) => (
          <div key={idx} className="border-b pb-4">
            <h2 className="text-xl font-semibold line-clamp-2">{article.title}</h2>
            {article.urlToImage && (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={500}
                height={300}
                className="mt-2 h-48 w-full object-cover"
              />
            )}
            <p className="mt-2 line-clamp-3 min-h-[72px]">{article.description}</p>
            <div className='flex justify-between items-center mt-4'>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                Read more
              </a>
              <form>
                <button
                  onClick={() => addArticle(article)}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Add My News
                </button>
              </form>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              発行日: {new Date(article.publishedAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>not found</p>
      )}
      </div>
    </div>
    </>
  );
}

