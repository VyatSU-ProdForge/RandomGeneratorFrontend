import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import styles from './styles/main-layout.module.scss';

interface IMainLayoutProps {
  showDate?: boolean;
  showMenuButton?: boolean;
  transparent?: boolean;
}

export function MainLayout({
  showDate = true,
  showMenuButton = true,
  transparent = false,
}: IMainLayoutProps): React.ReactElement {
  return (
    <div className={styles.layout}>
      <Header
        showDate={showDate}
        showMenuButton={showMenuButton}
        transparent={transparent}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

