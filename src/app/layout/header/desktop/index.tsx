import React, { useState } from 'react';
import logo from '@app/assets/images/logo.svg';
import styles from './styles/header-desktop.module.scss';
import { AppMenuModal } from '@/features/app-menu';

interface IHeaderDesktopProps {
  showDate?: boolean;
  showMenuButton?: boolean;
  transparent?: boolean;
}

export function HeaderDesktop({
  showDate = true,
  showMenuButton = true,
  transparent = false,
}: IHeaderDesktopProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      <div className={`${styles.stickyLogo} ${transparent ? styles.transparent : ''}`}>
        <div className={styles.logoCard}>
          <img src={logo} alt="СТОЛОТО" className={styles.logo} />
        </div>
      </div>
      <div className={`${styles.headerInfo} ${transparent ? styles.transparent : ''}`}>
        {showDate && <span className={styles.date}>{currentDate}</span>}
        {showMenuButton && (
          <button className={styles.menuButton} onClick={() => setIsModalOpen(true)}>
            Меню
          </button>
        )}
      </div>
      <AppMenuModal 
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

