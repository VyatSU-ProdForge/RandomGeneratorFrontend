import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../header';
import { RoutePath } from '@app/navigation/routes';
import styles from './styles/main-layout.module.scss';

interface IMainLayoutProps {
  showDate?: boolean;
  showAuthButton?: boolean;
  transparent?: boolean;
}

export function MainLayout({
  showDate = true,
  showAuthButton = true,
  transparent = false,
}: IMainLayoutProps): React.ReactElement {
  const navigate = useNavigate();

  const handleAuthClick = (): void => {
    // Переход на страницу логина
    void navigate(RoutePath.Login);
  };

  return (
    <div className={styles.layout}>
      <Header
        showDate={showDate}
        showAuthButton={showAuthButton}
        onAuthClick={handleAuthClick}
        transparent={transparent}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

