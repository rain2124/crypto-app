"use client";
import { useContext, useEffect, useState } from 'react';
import { NewsArticle } from '../../../type/Article';
import { AuthContext } from "../contexts/AuthContext";
import { FetchMyNews } from '@/app/api/fetchApi';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

export default function MyNewsList() {
  const [loading, setLoading] = useState<boolean>(false);
  const {session} = useContext(AuthContext);
  const [message, setMessage] = useState<string>('');
  const [myNewsLists, setMyNewsLists] = useState<NewsArticle[]>([]);
  const router = useRouter();
  console.log(session);

  const fetchMyNews = async () => {
    // TODO: ssrで読み込み
    try {
      const {data , error} = await FetchMyNews();
      if (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
      setMyNewsLists(data);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (mynewsId: string) => {
    const { error } = await supabase.from('mynews').delete().eq('id', mynewsId);
    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      console.log('Post deleted successfully');
    }
  };

  useEffect(() => {
    if (!session) {
      router.push('/');
    } else {
      fetchMyNews();
    }
  });

  return (
    <>
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">MY NEWS</h1>
        {message && <p className="mt-4">{message}</p>}
        <div className='grid-cols-2 gap-6 grid md:grid-cols-3 md:gap-8'>
        {loading ? (
          <p>Loading...</p>
        ) : myNewsLists?.length > 0 ? (
          myNewsLists.map((myNewsList, idx) => (
            <div key={idx} className="border-b pb-4">
              <h2 className="text-xl font-semibold line-clamp-2">{myNewsList.title}</h2>
              {myNewsList.image_url && (
                <Image
                  src={myNewsList.image_url}
                  alt={myNewsList.title}
                  width={500}
                  height={300}
                  className="mt-2 h-48 w-full object-cover"
                  priority
                />
              )}
              <p className="mt-2 line-clamp-3 min-h-[72px]">{myNewsList.description}</p>
              <div className='gap mt-4'>
                <a href={myNewsList.url} target="_blank" rel="noopener noreferrer" className="block w-full mb-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Read more
                </a>
                <Link
                  className="block w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-3"
                  href={`/mynews/${myNewsList?.id}/`}
                >
                    detail
                </Link>
                <button
                  onClick={() => handleDeleteNews(myNewsList?.id)}
                  className="block w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-3">
                    delete
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                発行日: {new Date(myNewsList.publishedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>not found</p>
        )}
        </div>
      </div>
    </>
  )
}
