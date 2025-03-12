
"use client"
import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
import { AuthContext } from "./contexts/AuthContext";
import Image from 'next/image';

// interface Article {
//   source: { id: string | null; name: string };
//   author: string | null;
//   title: string;
//   description: string | null;
//   url: string;
//   urlToImage: string | null;
//   publishedAt: string;
//   content: string | null;
// }

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsData {
  status: string;
  totalResults: number;
  articles: Article[];
}

export default function HomePage() {

  // const language = 'en';
  // const q = 'crypto';
  // const pageSize = '10';
  // const API_URL = `https://newsapi.org/v2/everything?language=${language}&pageSize=${pageSize}&q=${q}&apiKey=b3525f00389c4c6884d04c85ee038c20`;

  // const [articles, setArticles] = useState<Article[]>([]);
  // const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const response = await axios.get(API_URL);
  //       setArticles(response.data.articles);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchNews();
  // }, []);
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data: NewsData = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('ニュースの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <p className='text-center mt-10'>読み込み中...</p>;

  return (
    <>
    <div className="px-6 py-10">
      <div>ログイン状況 : {session ? <span>ログイン中</span> : <span>未ログイン</span> }</div>
      <h1 className="text-3xl font-bold">NEWS一覧</h1>
      <div className='grid-cols-2 gap-6 grid md:grid-cols-3 md:gap-8'>
        {articles.length > 0 ? (
          articles.map( (article, index) => (
            <div key={index} className="mt-4 border-b pb-4">
              <h2 className="text-xl font-semibold line-clamp-2">{article.title}</h2>
              {article.urlToImage &&
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  width={500}
                  height={300}
                  className="mt-2 h-48 w-full object-cover"
                />
              }
              <p className="mt-2 line-clamp-3">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>記事は見つかりません。</p>
        ) }
      </div>
    </div>
    </>
  );
}
