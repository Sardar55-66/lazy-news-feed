import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsItem } from '../types/news';

interface UIState {
  selectedNews: NewsItem | null;
  isDetailView: boolean;
}

const initialState: UIState = {
  selectedNews: null,
  isDetailView: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openNewsDetail: (state, action: PayloadAction<NewsItem>) => {
      state.selectedNews = action.payload;
      state.isDetailView = true;
    },
    closeNewsDetail: (state) => {
      state.selectedNews = null;
      state.isDetailView = false;
    },
  },
});

export const { openNewsDetail, closeNewsDetail } = uiSlice.actions;
export default uiSlice.reducer; 