import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewsItem, NewsResponse } from '../types/news';
import { newsApi } from '../services/newsApi';

interface NewsState {
  items: NewsItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
  total: number;
}

const initialState: NewsState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0,
  total: 0,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) => {
    const response = await newsApi.getNews(limit, skip);
    return response;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNews: (state) => {
      state.items = [];
      state.skip = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
        state.loading = false;
        if (action.payload.skip === 0) {
          state.items = action.payload.posts;
        } else {
          state.items = [...state.items, ...action.payload.posts];
        }
        state.skip = action.payload.skip + action.payload.limit;
        state.total = action.payload.total;
        state.hasMore = state.items.length < action.payload.total;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка при загрузке новостей';
      });
  },
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer; 