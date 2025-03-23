export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  image_url?: string;
}
export interface Comments {
  id: string;
  content: string;
};