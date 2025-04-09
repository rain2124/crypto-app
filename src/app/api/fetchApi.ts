import { supabase } from '../../../lib/supabaseClient';

// api fetch mynews
export const FetchMyNews = async () => {
  return await supabase
  .from('mynews')
  .select('*')
  .order('published_at', { ascending: false })
};

// api fetch mynewsdetail
export const FetchMyNewsDetail = async (id: string) => {
  return await supabase
  .from('mynews')
  .select('*')
  .eq('id', id)
  .single()
};

// api fetch comments
export const FetchComments = async (id: string) => {
  return await supabase
  .from('comments')
  .select('*')
  .eq('mynews_id', id)
  .order('created_at', { ascending: false })
};
