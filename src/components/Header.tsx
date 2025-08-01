import React from 'react';
import { Typography } from 'antd';
import { useAppSelector } from '../store/hooks';
import styles from './Header.module.scss';

const { Title } = Typography;

const Header: React.FC = () => {
  const { items, total } = useAppSelector((state) => state.news);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          Лента новостей
        </Title>
        {items.length > 0 && (
          <div className={styles.counter}>
            Загружено новостей: {items.length} из {total}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 