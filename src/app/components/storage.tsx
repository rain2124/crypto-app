import { v4 as uuidv4 } from "uuid";
import { supabase } from '../../../lib/supabaseClient';

export const uploadStorage = async (file: any): Promise<any> => {
  const pathName = `public/news-image/${uuidv4()}.png`;
  const { data, error } = await supabase.storage.from("news-image").upload(pathName, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const insertTableImageUrl = `${data.path}`;
  const publicURL = supabase.storage.from("news-image").getPublicUrl(insertTableImageUrl).data.publicUrl;
  return publicURL;
};
