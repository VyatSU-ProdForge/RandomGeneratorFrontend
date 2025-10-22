import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import styles from './styles/main-layout.module.scss';

interface IMainLayoutProps {
  transparent?: boolean;
}

export function MainLayout({
  transparent = false,
}: IMainLayoutProps): React.ReactElement {
  return (
    <div className={styles.layout}>
      <Header transparent={transparent} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

