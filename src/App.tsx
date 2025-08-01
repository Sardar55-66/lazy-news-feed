import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store/store';
import Header from './components/Header';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { closeNewsDetail } from './store/uiSlice';
import styles from './App.module.scss';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedNews, isDetailView } = useAppSelector((state) => state.ui);

  const handleBack = () => {
    dispatch(closeNewsDetail());
  };

  return (
    <div className={styles.app}>
      <Header />
      {isDetailView && selectedNews ? (
        <NewsDetail news={selectedNews} onBack={handleBack} />
      ) : (
        <NewsList />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <AppContent />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
