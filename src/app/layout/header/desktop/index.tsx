import React from 'react';
import logo from '@app/assets/images/logo.svg';
import styles from './styles/header-desktop.module.scss';

interface IHeaderDesktopProps {
  transparent?: boolean;
}

export function HeaderDesktop({
  transparent = false,
}: IHeaderDesktopProps): React.ReactElement {
  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.logoCard}>
        <img src={logo} alt="СТОЛОТО" className={styles.logo} />
      </div>
    </header>
  );
}

