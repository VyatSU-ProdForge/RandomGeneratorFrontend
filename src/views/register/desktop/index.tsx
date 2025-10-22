import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@providers/use-auth-context';
import { AppInput } from '@components/simple/app-input';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import { getUserRole } from '@/utils/helpers/user-role';
import logo from '@app/assets/images/logo.svg';
import styles from './styles/register-desktop.module.scss';

export function RegisterDesktop(): React.ReactElement {
  const navigate = useNavigate();
  const { register, isLoading, error, user } = useAuthContext();
  
  const [formData, setFormData] = React.useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    
    // Для ФИО полей - только буквы
    if (field === 'lastName' || field === 'firstName' || field === 'middleName') {
      value = value.replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    await register({
      lastName: formData.lastName.trim(),
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
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
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.subtitle}>Введите необходимые данные для входа</p>
        </div>

        {/* Форма */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* ФИО - три поля */}
          <div className={styles.fioGroup}>
            <AppInput 
              type="text"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              required
            />
            <AppInput 
              type="text"
              placeholder="Имя"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              required
            />
            <AppInput 
              type="text"
              placeholder="Отчество"
              value={formData.middleName}
              onChange={handleInputChange('middleName')}
              required
            />
          </div>
          
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
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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

