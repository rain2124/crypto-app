"use client";
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient';
import { use } from 'react';
import { FetchMyNewsDetail } from '@/app/api/fetchApi';
import { FetchComments } from '@/app/api/fetchApi';
import { NewsArticle } from '../../../../type/Article';
import { CommentType } from '../../../../type/Article';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

export default function MyNewsDetail({ params }: { params: Promise<NewsArticle> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [myNewsList, setMyNewsList] = useState<NewsArticle | null>(null);
  const { id } = use(params);
  const [newComment, setNewComment] = useState<string>('');
  const [commentMessage, setCommentMessage] = useState<string>('');
  const [commentLists, setCommentLists] = useState<CommentType[]>([]);
  const [findCommentId, setFindCommentId] = useState<string | undefined>(undefined);
  const [editComment, setEditComment] = useState<string>('');

  // supabase mynews fetch
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
  // supabase comments fetch
  const FetchMyNewsComments = async () => {
    // TODO: ssrで読み込み
    try {
      const {data , error} = await FetchComments(id);
      // const res = await FetchComments(id);
      if (error) {
        console.error('Error fetching comments:', error);
        return [];
      } else if (data) {
        setCommentLists(data);
      }
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
  // supabase comments insert機能
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment === "") return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("comments").insert({
      id: uuidv4(),
      user_id: user?.id,
      comment: newComment,
      mynews_id: id
    });
    setNewComment('');
  };

  // supabase comments update機能
  const handleUpdate = async () => {
    if (findCommentId === "" || editComment === "") return;
    const { data: { user }, } = await supabase.auth.getUser();
    await supabase.from("comments").update({
      id: findCommentId,
      user_id: user?.id,
      comment: editComment,
      mynews_id: id
    }).eq('id', findCommentId);
    setFindCommentId(undefined);
    setEditComment('');
  };
  // supabase comments delete機能
  const handleDeleteComment = async (id: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      console.log('Post deleted successfully');
    }
  };

  // findCommentId
  const handleEditButton = async (id: string, comment: string) => {
    setEditComment(comment);
    setFindCommentId(id);
  };

  useEffect(() => {
    FetchMyNewsDetailData();
    FetchMyNewsComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commentLists]);

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
          発行日: {new Date(myNewsList.published_at).toLocaleString('ja-JP', { hour12: false })}
          </p>
        </div>
        
        {/* commentList */}
        <div className="p-comments w-full mx-auto">
          <h2 className="InputArea__title text-3xl my-6">Comments</h2>
          <ul className="my-3">
          {commentMessage && <p className="mt-2">{commentMessage}</p>}
          {commentLists?.length > 0 ? (
            commentLists.map((commentList, idx) => (
            <li className='flex justify-between pb-4 mb-4 border-b-2 from-blue-500' key={idx}>
            {findCommentId !== commentList.id ?
              <>
                <div>
                  <p className="mt-2" >{commentList.comment}</p>
                  <p className="mt-2" >{new Date(commentList.created_at).toLocaleString('ja-JP', { hour12: false })}</p>
                </div>
                <div className='flex'>
                  <button
                    onClick={() => handleEditButton(commentList.id, commentList.comment)}
                    className='block w-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-3'
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(commentList.id)}
                    className='block w-auto text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-3'
                  >
                    delete
                  </button>
                </div>
              </>
              :
              <>
                <div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className='rounded-md border border-solid border-[#000] text-left p-2'
                  />
                  <p className="mt-2">{commentList.created_at}</p>
                </div>
                <div className='flex'>
                  <button
                    onClick={() => handleUpdate()}
                    className='block w-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-3'
                  >
                    update
                  </button>
                </div>
              </>
              }
            </li>
          ))) : (
            <p>not found</p>
          )}
          </ul>
          {/* add comment */}
          <h2 className="InputArea__title text-3xl my-6">Add Comments</h2>
          <form
            className="p-comments__InputArea InputArea grid grid-cols-[auto,100px] gap-6 sm:gap-8 sm:grid-cols-[auto,172px] mb-7 items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              className="rounded-md border border-solid border-[#000] text-left p-2"
              value={newComment}
              placeholder="your comments..."
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="block w-auto h-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Comment</button>
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
