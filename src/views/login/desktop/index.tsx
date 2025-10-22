import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@providers/use-auth-context';
import { AppInput } from '@components/simple/app-input';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import { getUserRole } from '@/utils/helpers/user-role';
import logo from '@app/assets/images/logo.svg';
import styles from './styles/login-desktop.module.scss';

export function LoginDesktop(): React.ReactElement {
  const navigate = useNavigate();
  const { login, isLoading, error, user } = useAuthContext();
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    await login({
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  // Следим за изменением пользователя и перенаправляем в зависимости от роли
  React.useEffect(() => {
    if (user) {
      const role = getUserRole(user);
      if (role === 'admin') {
        void navigate(RoutePath.Admin);
      } else {
        void navigate(RoutePath.GameRoom);
      }
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Логотип */}
        <div className={styles.logoWrapper}>
          <img src={logo} alt="СТОЛОТО" className={styles.logo} />
        </div>

        {/* Заголовок */}
        <div className={styles.header}>
          <h1 className={styles.title}>Вход</h1>
          <p className={styles.subtitle}>Введите ваши данные для входа в систему</p>
        </div>

        {/* Форма */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <AppInput 
            type="email"
            placeholder="Почта"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
          />
          
          <AppInput 
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleInputChange('password')}
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <AppButton 
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
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

