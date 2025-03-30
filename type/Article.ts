export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  published_at: string;
  image_url?: string;
}
export interface CommentType {
  id: string;
  user_id: string;
  comment: string;
  mynews_id: string;
  created_at: string;
}
