export interface NewsItem {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number; // Количество лайков
}

export interface NewsResponse {
  posts: NewsItem[];
  total: number;
  skip: number;
  limit: number;
} 