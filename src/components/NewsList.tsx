import React, { useEffect, useCallback, useRef } from 'react';
import { List, Spin, Alert, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchNews } from '../store/newsSlice';
import { openNewsDetail } from '../store/uiSlice';
import NewsCard from './NewsCard';
import styles from './NewsList.module.scss';

const { Title } = Typography;

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, hasMore, skip, total } = useAppSelector((state) => state.news);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNews({ limit: 10, skip: 0 }));
    }
  }, [dispatch, items.length]);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(fetchNews({ limit: 10, skip }));
      }
    });
    
    if (node) {
      observerRef.current.observe(node);
    }
  }, [loading, hasMore, skip, dispatch]);

  if (error) {
    return (
      <Alert
        message="Ошибка загрузки"
        description={error}
        type="error"
        showIcon
        style={{ margin: 16 }}
      />
    );
  }

  return (
    <div className={styles.newsList}>
      <Title level={2} className={styles.title}>
        Лента новостей
      </Title>
      {items.length > 0 && (
        <div className={styles.counter}>
          Загружено новостей: {items.length} из {total}
        </div>
      )}
      
      <List
        dataSource={items}
        renderItem={(news, index) => (
          <List.Item key={news.id} style={{ padding: 0 }}>
            <div
              ref={index === items.length - 1 ? lastElementRef : undefined}
              style={{ width: '100%' }}
            >
              <NewsCard 
                news={news} 
                onClick={() => dispatch(openNewsDetail(news))}
              />
            </div>
          </List.Item>
        )}
      />
      
      {loading && (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <div className={styles.loadingText}>
            Загрузка новостей...
          </div>
        </div>
      )}
      
      {!hasMore && items.length > 0 && (
        <div className={styles.endMessage}>
          Все новости загружены
        </div>
      )}
    </div>
  );
};

export default NewsList; 