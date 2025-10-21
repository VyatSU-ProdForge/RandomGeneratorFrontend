import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppInput } from '@components/simple/app-input';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import logo from '@app/assets/images/logo.svg';
import styles from './login-desktop.module.scss';

export function LoginDesktop(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Логотип */}
        <div className={styles.logoWrapper}>
          <img src={logo} alt="СТОЛОТО" className={styles.logo} />
        </div>

        {/* Заголовок */}
        <div className={styles.header}>
          <h1 className={styles.title}>Введите вашу почту</h1>
          <p className={styles.subtitle}>Мы отправим единоразовый код на вашу почту.</p>
        </div>

        {/* Форма */}
        <form className={styles.form}>
          <AppInput 
            type="email"
            placeholder="Почта"
          />
          
          <AppInput 
            type="password"
            placeholder="Пароль"
          />

          <AppButton 
            type="button"
            variant="primary"
            fullWidth
            onClick={(): void => { void navigate(RoutePath.GameRoom); }}
          >
            Войти
          </AppButton>
        </form>

        {/* Ссылка на регистрацию */}
        <div className={styles.footer}>
          <a href="/register" className={styles.link}>На страницу регистрации</a>
        </div>
      </div>
    </div>
  );
}

