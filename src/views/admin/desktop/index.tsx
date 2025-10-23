import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@providers/use-auth-context';
import { useServicesContext } from '@providers/use-services-context';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import type { Lottery } from '@/data/api/repositories/lottery-repository';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/admin-desktop.module.scss';

type TabType = 'new' | 'history';

export function AdminDesktop(): React.ReactElement {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { lotteryService } = useServicesContext();
  
  const [activeTab, setActiveTab] = React.useState<TabType>('new');
  const [lotteries, setLotteries] = React.useState<Lottery[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleLogout = async (): Promise<void> => {
    await logout();
    void navigate(RoutePath.Login);
  };
  
  const handleCreateGame = (): void => {
    void navigate(RoutePath.CreateGame);
  };

  const formatTimeLeft = (endDate: string): string => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Завершено';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `Осталось ${days}ч : ${hours}мин`;
  };

  const formatAmount = (amount: number): string => {
    return amount.toLocaleString('ru-RU') + ' руб';
  };

  const loadLotteries = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await lotteryService.getLotteries({
        page: 1,
        limit: 100,
        // Для "Новые" не фильтруем по статусу (показываем все кроме finished)
        // Для "История" показываем только finished
        ...(activeTab === 'history' && { status: 'finished' }),
      });
      
      // Фильтруем на фронте для таба "Новые" (исключаем finished)
      const filteredData = activeTab === 'new' 
        ? response.data.filter(lottery => lottery.status !== 'finished')
        : response.data;
      
      setLotteries(filteredData);
    } catch (error) {
      console.error('Failed to load lotteries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [lotteryService, activeTab]);

  React.useEffect(() => {
    void loadLotteries();
  }, [loadLotteries]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Игровая комната</h1>
        
        <AppButton 
          variant="secondary"
          onClick={handleCreateGame}
          fullWidth
        >
          Создать игру
        </AppButton>

        {/* Табы */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'new' ? styles.tabActive : ''}`}
            onClick={(): void => setActiveTab('new')}
          >
            Новые
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
            onClick={(): void => setActiveTab('history')}
          >
            История
          </button>
        </div>

        {/* Список лотерей */}
        <div className={styles.lotteriesList}>
          {isLoading ? (
            <div className={styles.loading}>Загрузка...</div>
          ) : lotteries.length === 0 ? (
            <div className={styles.empty}>Нет доступных игр</div>
          ) : (
            lotteries.map((lottery) => (
              <div key={lottery.id} className={styles.lotteryCard}>
                {/* Картинка сверху */}
                <div className={styles.imageWrapper}>
                  <img 
                    src={lottery.image.url} 
                    alt={lottery.name} 
                    className={styles.image} 
                  />
                </div>

                {/* Контент карточки */}
                <div className={styles.cardContent}>
                  {/* Иконка и название */}
                  <div className={styles.header}>
                    <img src={gameIcon} alt="" className={styles.icon} />
                    <h3 className={styles.cardTitle}>{lottery.name}</h3>
                  </div>

                  {/* Суперприз */}
                  <div className={styles.jackpot}>
                    <span className={styles.jackpotLabel}>Суперприз:</span>
                    <span className={styles.jackpotAmount}>{formatAmount(lottery.amount)}</span>
                  </div>

                  {/* Описание */}
                  <p className={styles.description}>{lottery.description}</p>

                  {/* Таймер */}
                  <p className={styles.timer}>{formatTimeLeft(lottery.endAt)}</p>

                  {/* Кнопка */}
                  {lottery.status === 'finished' ? (
                    <AppButton 
                      variant="primary" 
                      fullWidth 
                      onClick={(): void => {
                        void navigate(`/admin/game-result/${lottery.id}`);
                      }}
                    >
                      Начать игру
                    </AppButton>
                  ) : (lottery.status === 'draft' || lottery.status === 'inProgress') ? (
                    <AppButton 
                      variant="primary" 
                      fullWidth 
                      onClick={(): void => {
                        void navigate(`/admin/game/${lottery.id}`);
                      }}
                    >
                      Перейти к игре
                    </AppButton>
                  ) : (
                    <AppButton 
                      variant="primary" 
                      fullWidth 
                      disabled
                    >
                      Игра завершена
                    </AppButton>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

