import React from 'react';
import logo from '@app/assets/images/logo.svg';
import styles from './styles/header-mobile.module.scss';

interface IHeaderMobileProps {
  transparent?: boolean;
}

export function HeaderMobile({
  transparent = false,
}: IHeaderMobileProps): React.ReactElement {
  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.logoCard}>
        <img src={logo} alt="СТОЛОТО" className={styles.logo} />
      </div>
    </header>
  );
}

