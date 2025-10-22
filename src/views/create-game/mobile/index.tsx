import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@providers/use-auth-context';
import { AppInput } from '@components/simple/app-input';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import styles from './styles/create-game-mobile.module.scss';

export function CreateGameMobile(): React.ReactElement {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    barrelCount: '',
    barrelLimit: '',
    amount: '',
    startDate: '',
    endDate: '',
  });
  
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formatDateInput = (value: string): string => {
    // Убираем все символы кроме цифр
    const numbers = value.replace(/\D/g, '');
    
    // Применяем маску ДД.ММ.ГГ ЧЧ:ММ:СС с валидацией
    let formatted = '';
    
    if (numbers.length > 0) {
      // День (01-31)
      let day = numbers.substring(0, 2);
      if (day.length === 2 && parseInt(day) > 31) day = '31';
      if (day.length === 1 && parseInt(day) > 3) day = '0' + day;
      formatted = day;
    }
    if (numbers.length >= 3) {
      // Месяц (01-12)
      let month = numbers.substring(2, 4);
      if (month.length === 2 && parseInt(month) > 12) month = '12';
      if (month.length === 1 && parseInt(month) > 1) month = '0' + month;
      formatted += '.' + month;
    }
    if (numbers.length >= 5) {
      // Год (00-99)
      formatted += '.' + numbers.substring(4, 6);
    }
    if (numbers.length >= 7) {
      // Часы (00-23)
      let hours = numbers.substring(6, 8);
      if (hours.length === 2 && parseInt(hours) > 23) hours = '23';
      if (hours.length === 1 && parseInt(hours) > 2) hours = '0' + hours;
      formatted += ' ' + hours;
    }
    if (numbers.length >= 9) {
      // Минуты (00-59)
      let minutes = numbers.substring(8, 10);
      if (minutes.length === 2 && parseInt(minutes) > 59) minutes = '59';
      if (minutes.length === 1 && parseInt(minutes) > 5) minutes = '0' + minutes;
      formatted += ':' + minutes;
    }
    if (numbers.length >= 11) {
      // Секунды (00-59)
      let seconds = numbers.substring(10, 12);
      if (seconds.length === 2 && parseInt(seconds) > 59) seconds = '59';
      if (seconds.length === 1 && parseInt(seconds) > 5) seconds = '0' + seconds;
      formatted += ':' + seconds;
    }
    
    return formatted;
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleNumberInputChange = (field: 'barrelCount' | 'barrelLimit' | 'amount') => (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Оставляем только цифры
    const value = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateInputChange = (field: 'startDate' | 'endDate') => (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatDateInput(e.target.value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
  };

  const handleImageClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверка типа файла
      if (!file.type.match(/^image\/(svg\+xml|jpeg|jpg)$/)) {
        setError('Допустимы только SVG и JPG изображения');
        return;
      }
      
      setSelectedImage(file);
      
      // Создаем превью
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (): void => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDateForAPI = (dateString: string): string => {
    // Преобразуем формат DD.MM.YY HH:mm:ss в ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
    if (!dateString) return '';
    
    const [datePart, timePart] = dateString.split(' ');
    if (!datePart || !timePart) {
      console.error('Invalid date format:', dateString);
      return '';
    }
    
    const [day, month, year] = datePart.split('.');
    if (!day || !month || !year) {
      console.error('Invalid date parts:', { day, month, year });
      return '';
    }
    
    // Преобразуем год в полный формат (24 -> 2024)
    const fullYear = year.length === 2 ? `20${year}` : year;
    
    // Добавляем padding к дню и месяцу, если нужно
    const paddedDay = day.padStart(2, '0');
    const paddedMonth = month.padStart(2, '0');
    
    // Разбираем время и добавляем padding
    const [hours, minutes, seconds] = timePart.split(':');
    if (!hours || !minutes || !seconds) {
      console.error('Invalid time parts:', { hours, minutes, seconds });
      return '';
    }
    
    const paddedHours = hours.padStart(2, '0');
    const paddedMinutes = minutes.padStart(2, '0');
    const paddedSeconds = seconds.padStart(2, '0');
    
    // Отправляем без Z, чтобы сервер интерпретировал как локальное время
    const isoDate = `${fullYear}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}:${paddedSeconds}.000Z`;
    console.log('Converted date:', dateString, '→', isoDate);
    
    return isoDate;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError('Необходимо загрузить изображение события');
      return;
    }
    
    if (!formData.startDate || !formData.endDate) {
      setError('Необходимо указать дату начала и окончания');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', selectedImage);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('startAt', formatDateForAPI(formData.startDate));
      formDataToSend.append('endAt', formatDateForAPI(formData.endDate));
      formDataToSend.append('barrelCount', formData.barrelCount);
      formDataToSend.append('barrelLimit', formData.barrelLimit);
      formDataToSend.append('amount', formData.amount);
      
      const response = await fetch('http://91.186.196.211:3001/api/lottery/v1', {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Ошибка создания игры');
      }
      
      const result = await response.json();
      console.log('Игра создана:', result);
      
      // Возвращаемся на страницу администратора
      void navigate(RoutePath.Admin);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания игры');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={(): void => { void navigate(RoutePath.Admin); }}
        >
          ← На главную
        </button>
        <h1 className={styles.title}>Создание новой игры</h1>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        {/* Название игры */}
        <div className={styles.field}>
          <label className={styles.label}>Название игры</label>
          <AppInput
            type="text"
            placeholder="Название игры"
            value={formData.name}
            onChange={handleInputChange('name')}
            required
          />
        </div>

        {/* Описание игры */}
        <div className={styles.field}>
          <label className={styles.label}>Описание игры</label>
          <textarea
            className={styles.textarea}
            placeholder="Описание игры"
            value={formData.description}
            onChange={handleInputChange('description')}
            rows={3}
            required
          />
        </div>

        {/* Изображение события */}
        <div className={styles.field}>
          <label className={styles.label}>Изображение события</label>
          <div 
            className={styles.imageUpload}
            onClick={handleImageClick}
          >
            {imagePreview ? (
              <div className={styles.imagePreviewWrapper}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={(e): void => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className={styles.imagePlaceholder}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 14V34M14 24H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/svg+xml,image/jpeg,image/jpg"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Количество бочек */}
        <div className={styles.field}>
          <label className={styles.label}>Количество бочек</label>
          <AppInput
            type="text"
            placeholder="100"
            value={formData.barrelCount}
            onChange={handleNumberInputChange('barrelCount')}
            required
          />
        </div>

        {/* Лимит выигрышных бочек */}
        <div className={styles.field}>
          <label className={styles.label}>Лимит выигрышных бочек</label>
          <AppInput
            type="text"
            placeholder="5"
            value={formData.barrelLimit}
            onChange={handleNumberInputChange('barrelLimit')}
            required
          />
        </div>

        {/* Суперприз */}
        <div className={styles.field}>
          <label className={styles.label}>Суперприз</label>
          <AppInput
            type="text"
            placeholder="7000000"
            value={formData.amount}
            onChange={handleNumberInputChange('amount')}
            required
          />
        </div>

        {/* Время события */}
        <div className={styles.field}>
          <label className={styles.label}>Время события</label>
          <div className={styles.dateFields}>
            <div className={styles.dateField}>
              <label className={styles.dateLabel}>Дата начала</label>
              <AppInput
                type="text"
                placeholder="12.07.24 12:34:00"
                value={formData.startDate}
                onChange={handleDateInputChange('startDate')}
                required
              />
            </div>
            <div className={styles.dateField}>
              <label className={styles.dateLabel}>Дата окончания</label>
              <AppInput
                type="text"
                placeholder="31.12.24 23:59:59"
                value={formData.endDate}
                onChange={handleDateInputChange('endDate')}
                required
              />
            </div>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <AppButton
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Создание...' : 'Создать игру'}
        </AppButton>
      </form>
    </div>
  );
}

