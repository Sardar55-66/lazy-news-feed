import React from 'react';
import { Card, Button, Typography, Space, Tag } from 'antd';
import { ArrowLeftOutlined, LikeOutlined } from '@ant-design/icons';
import { NewsItem } from '../types/news';
import styles from './NewsDetail.module.scss';

const { Title, Paragraph } = Typography;

interface NewsDetailProps {
  news: NewsItem;
  onBack: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, onBack }) => {
  return (
    <div className={styles.newsDetail}>
      <div className={styles.container}>
        <Card className={styles.card} bodyStyle={{ padding: 20 }}>
          <Title level={2} className={styles.title}>
            {news.title}
          </Title>
          
          <Paragraph className={styles.body}>
            {news.body}
          </Paragraph>
          
          <Space direction="vertical" size="large" className={styles.tagsSection}>
            {news.tags.length > 0 && (
              <div>
                <Title level={5} className={styles.tagsTitle}>
                  Теги:
                </Title>
                <div>
                  {news.tags.map((tag, index) => (
                    <Tag key={index} color="blue" className={styles.tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
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
      </div>
      
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        className={styles.backButton}
      />
    </div>
  );
};

export default NewsDetail; 