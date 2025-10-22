import React from 'react';
import styles from './styles/admin-desktop.module.scss';

export function AdminDesktop(): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Панель администратора</h1>
        <p className={styles.subtitle}>Десктопная версия</p>
      </div>
    </div>
  );
}

