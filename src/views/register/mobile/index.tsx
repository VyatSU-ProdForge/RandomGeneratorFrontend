import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppInput } from '@components/simple/app-input';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import logo from '@app/assets/images/logo.svg';
import styles from './register-mobile.module.scss';

export function RegisterMobile(): React.ReactElement {
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
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.subtitle}>Введите необходимые данные для входа</p>
        </div>

        {/* Форма */}
        <form className={styles.form}>
          <AppInput 
            type="text"
            placeholder="Имя"
          />
          
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
            Зарегистрироваться
          </AppButton>
        </form>

        {/* Ссылка на вход */}
        <div className={styles.footer}>
          <a href="/login" className={styles.link}>На страницу входа</a>
        </div>
      </div>
    </div>
  );
}

