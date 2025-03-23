export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  image_url?: string;
}
export interface CommentType {
  id?: string;
  user_id?: string;
  comment?: string;
}
