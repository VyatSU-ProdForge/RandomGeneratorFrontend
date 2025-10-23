import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useServicesContext } from '@providers/use-services-context';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import type { Lottery } from '@/data/api/repositories/lottery-repository';
import styles from './styles/game-details-mobile.module.scss';

export function GameDetailsMobile(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lotteryService } = useServicesContext();
  
  const [lottery, setLottery] = React.useState<Lottery | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const formatDateForDisplay = (isoDate: string): string => {
    const date = new Date(isoDate);
    // Используем локальные методы, чтобы показывать время в часовом поясе пользователя
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  const loadLottery = React.useCallback(async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await lotteryService.getLotteryById(Number(id));
      setLottery(data);
    } catch (err) {
      setError('Ошибка загрузки данных');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id, lotteryService]);

  React.useEffect(() => {
    void loadLottery();
  }, [loadLottery]);

  const handleBack = (): void => {
    void navigate(RoutePath.Admin);
  };

  const getButtonText = (): string => {
    if (!lottery) return 'Дождитесь начала';
    
    switch (lottery.status) {
      case 'draft':
        return 'Дождитесь начала';
      case 'inProgress':
        return 'Дождитесь конца регистрации';
      case 'finished':
        return 'Начать игру';
      default:
        return 'Недоступно';
    }
  };

  const isGameReady = lottery?.status === 'finished';

  const handleStartGame = (): void => {
    if (!isGameReady || !id) return;
    void navigate(`/admin/game-result/${id}`);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (!lottery) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Игра не найдена</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Шапка */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← На главную
        </button>
      </div>

      {/* Карточка */}
      <div className={styles.card}>
        <h1 className={styles.cardTitle}>Игра на старт!</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Название игры */}
        <div className={styles.field}>
          <label className={styles.label}>Название игры</label>
          <div className={styles.value}>{lottery.name}</div>
        </div>

        {/* Описание */}
        <div className={styles.field}>
          <label className={styles.label}>Описание игры</label>
          <div className={styles.value}>{lottery.description}</div>
        </div>

        {/* Изображение */}
        <div className={styles.field}>
          <label className={styles.label}>Картинка загруженная</label>
          <div className={styles.imageUpload}>
            <img src={lottery.image.url} alt={lottery.name} className={styles.imagePreviewFull} />
          </div>
        </div>

        {/* Количество бочек */}
        <div className={styles.field}>
          <label className={styles.label}>Количество бочек</label>
          <div className={styles.value}>{lottery.metadata.barrelCount}</div>
        </div>

        {/* Лимит выигрышных бочек */}
        <div className={styles.field}>
          <label className={styles.label}>Лимит выигрышных бочек</label>
          <div className={styles.value}>{lottery.metadata.barrelLimit}</div>
        </div>

        {/* Суперприз */}
        <div className={styles.field}>
          <label className={styles.label}>Суперприз</label>
          <div className={styles.value}>{lottery.amount.toLocaleString('ru-RU')} руб</div>
        </div>

        {/* Время события */}
        <div className={styles.field}>
          <label className={styles.label}>Время события</label>
          <div className={styles.dateFields}>
            <div className={styles.dateField}>
              <label className={styles.dateLabel}>Дата начала</label>
              <div className={styles.value}>{formatDateForDisplay(lottery.startAt)}</div>
            </div>
            <div className={styles.dateField}>
              <label className={styles.dateLabel}>Дата окончания</label>
              <div className={styles.value}>{formatDateForDisplay(lottery.endAt)}</div>
            </div>
          </div>
        </div>

        {/* Кнопка старта */}
        <AppButton 
          variant="primary" 
          fullWidth 
          disabled={!isGameReady}
          onClick={handleStartGame}
        >
          {getButtonText()}
        </AppButton>
      </div>
    </div>
  );
}

