import React from 'react';
import styles from './styles/admin-mobile.module.scss';

export function AdminMobile(): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Панель администратора</h1>
        <p className={styles.subtitle}>Мобильная версия</p>
      </div>
    </div>
  );
}

