import React from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { NewsItem } from '../types/news';
import styles from './NewsCard.module.scss';

const { Title, Paragraph } = Typography;

interface NewsCardProps {
  news: NewsItem;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <Card
      hoverable
      className={styles.newsCard}
      onClick={onClick}
    >
      <Title level={4} className={styles.title}>
        {news.title}
      </Title>
      
      <Paragraph
        ellipsis={{
          rows: 3,
          expandable: false,
        }}
        className={styles.body}
      >
        {news.body}
      </Paragraph>
      
      <Space direction="vertical" size="small" className={styles.tagsContainer}>
        {news.tags.length > 0 && (
          <div>
            {news.tags.map((tag, index) => (
              <Tag key={index} color="blue" className={styles.tag}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
        
        <div className={styles.reactionsContainer}>
          <LikeOutlined className={styles.reactionsIcon} />
          <span className={styles.reactionsText}>
            {news.reactions} реакций
          </span>
        </div>
      </Space>
    </Card>
  );
};

export default NewsCard; 