import { supabase } from '../../../lib/supabaseClient';

export const FetchMyNews = async () => {
  return await supabase
  .from('mynews')
  .select('*')
};

export const FetchMyNewsDetail = async (id: string) => {
  return await supabase
  .from('mynews')
  .select('*')
  .eq('id', id)
  .single();
};

