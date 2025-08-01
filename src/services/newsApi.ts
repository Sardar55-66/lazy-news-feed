import axios from 'axios';
import { NewsResponse } from '../types/news';

const API_BASE_URL = 'https://dummyjson.com';

export const newsApi = {
  async getNews(limit: number = 10, skip: number = 0): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          limit,
          skip,
        },
      });
      
      const posts = response.data.posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags || [],
        reactions: post.reactions?.likes || Math.floor(Math.random() * 100) + 1, 
      }));

      return {
        posts,
        total: response.data.total,
        skip: response.data.skip,
        limit: response.data.limit,
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },
}; 