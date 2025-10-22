import React from 'react';
import logo from '@app/assets/images/logo.svg';
import styles from './styles/header-mobile.module.scss';

interface IHeaderMobileProps {
  showDate?: boolean;
  showAuthButton?: boolean;
  onAuthClick?: () => void;
  transparent?: boolean;
}

export function HeaderMobile({
  showDate = true,
  showAuthButton = true,
  onAuthClick,
  transparent = false,
}: IHeaderMobileProps): React.ReactElement {
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.logoCard}>
        <img src={logo} alt="СТОЛОТО" className={styles.logo} />
      </div>
      <div className={styles.headerInfo}>
        {showDate && <span className={styles.date}>{currentDate}</span>}
        {showAuthButton && (
          <button className={styles.authButton} onClick={onAuthClick}>
            Выход
          </button>
        )}
      </div>
    </header>
  );
}

