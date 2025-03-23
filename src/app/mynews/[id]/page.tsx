"use client";
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient';
import { use } from 'react';
import { FetchMyNewsDetail } from '@/app/api/fetchApi';
import { FetchComments } from '@/app/api/fetchApi';
import { NewsArticle } from '../../../../type/Article';
import { CommentType } from '../../../../type/Article';
import Image from 'next/image';

export default function MyNewsDetail({ params }: { params: Promise<NewsArticle> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [myNewsList, setMyNewsList] = useState<NewsArticle | null>(null);
  const { id } = use(params);

  // comments
  const [comment, setComment] = useState<string>("");
  const [commentMessage, setCommentMessage] = useState<string>('');
  const [commentList, setCommentList] = useState<CommentType | null>(null);

  const FetchMyNewsDetailData = async () => {
    // TODO: ssrで読み込み
    try {
      const {data , error} = await FetchMyNewsDetail(id);
      if (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
      setMyNewsList(data);
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

  const FetchMyNewsComments = async () => {
    // TODO: ssrで読み込み
    try {
      const {data , error} = await FetchComments(id);
      if (error) {
        console.error('Error fetching comments:', error);
        return [];
      }
      setCommentList(data);
    } catch (error) {
      if (error instanceof Error) {
        setCommentMessage(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // comments insert
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment === "") return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("comments").insert({
      id: id,
      user_id: user?.id,
      comment: comment,
    });
    setComment("");
  };
  useEffect(() => {
    FetchMyNewsDetailData();
    FetchMyNewsComments();
  },[]);

  return (
    <>
      <div className='px-6 py-10 w-full md:w-1/2 mx-auto'>
        <h1 className="text-3xl font-bold mb-6">MY NEWS</h1>
        {message && <p className="mt-4">{message}</p>}
        { loading ? (
          <p>Loading...</p>
        ) : myNewsList ? (
        <>
        <div className="border-b pb-4 ">
          <h2 className="text-xl font-semibold line-clamp-2">{myNewsList.title}</h2>
          {myNewsList.image_url && (
            <Image
              src={myNewsList.image_url}
              alt={myNewsList.title}
              width={500}
              height={300}
              className="mt-2 h-auto w-full object-cover"
              priority
            />
          )}
          <p className="mt-2 line-clamp-3 min-h-[72px]">{myNewsList.description}</p>
          <div className='gap mt-4'>
            <a href={myNewsList.url} target="_blank" rel="noopener noreferrer" className="block w-full mb-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Read more
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-2">
          発行日: {new Date(myNewsList.publishedAt).toLocaleString()}
          </p>
        </div>

        {/* comments */}
        <div className="p-comments mt-10 w-full mx-auto">
          <h2 className="InputArea__title text-3xl mb-7">Comments</h2>
          {commentMessage && <p className="mt-2">{commentMessage}</p>}
          {commentList && <p className="mt-2">{commentList.comment}</p>}
          <h2 className="InputArea__title text-3xl mb-7">Add Comments</h2>
          <form
            className="p-comments__InputArea InputArea grid grid-cols-[auto,100px] gap-6 sm:gap-8 sm:grid-cols-[auto,172px] mb-7"
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              id="comment"
              className="rounded-md border border-solid border-[#000] text-left p-2"
              value={comment}
              placeholder="your comments..."
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="InputArea__button w-full text-white rounded-md bg-[#18A0FB]">Comment</button>
          </form>
        </div>

        </>
        ) : (
          <p>not found</p>
        )}
      </div>
    </>
  )
}
