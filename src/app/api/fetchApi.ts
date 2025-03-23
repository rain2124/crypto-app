import { supabase } from '../../../lib/supabaseClient';

export const FetchMyNews = async () => {
  return await supabase
  .from('mynews')
  .select('*')
  .order('published_at', { ascending: false })
};

export const FetchMyNewsDetail = async (id: string) => {
  return await supabase
  .from('mynews')
  .select('*')
  .eq('id', id)
  .single()
};

export const FetchComments = async (id: string) => {
  return await supabase
  .from('comments')
  .select('*')
  .eq('id', id)
  .single()
};
