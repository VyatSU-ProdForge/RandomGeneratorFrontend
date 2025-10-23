import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@providers/use-auth-context';
import { useServicesContext } from '@providers/use-services-context';
import { RoutePath } from '@app/navigation/routes';
import { GameCard } from '@components/composite/game-card';
import type { Lottery } from '@/data/api/repositories/lottery-repository';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/game-room-mobile.module.scss';

export function GameRoomMobile(): React.ReactElement {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { lotteryService } = useServicesContext();
  
  const [activeTab, setActiveTab] = React.useState<'new' | 'history'>('new');
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

  const formatTimeLeft = (endDate: string): string => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Завершено';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `Осталось ${hours}ч : ${minutes}мин`;
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
      
      // Проверяем регистрацию пользователя для каждой лотереи
      const lotteriesWithRegistration = await Promise.all(
        filteredData.map(async (lottery) => {
          try {
            await lotteryService.getUserLotteryResults(lottery.id);
            console.log(`Lottery ${lottery.id}: user IS registered`);
            return { ...lottery, isUserRegistered: true };
          } catch (error: any) {
            console.log(`Lottery ${lottery.id}: user NOT registered`, error.response?.status);
            return { ...lottery, isUserRegistered: false };
          }
        })
      );
      
      setLotteries(lotteriesWithRegistration as any);
    } catch (error) {
      console.error('Failed to load lotteries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [lotteryService, activeTab]);

  React.useEffect(() => {
    void loadLotteries();
  }, [loadLotteries]);

  const gameCards = lotteries.map((lottery: any) => ({
    id: String(lottery.id),
    name: lottery.name,
    drawNumber: '', // У нас пока нет номера тиража
    jackpot: formatAmount(lottery.amount),
    description: lottery.description,
    timeLeft: formatTimeLeft(lottery.endAt),
    price: activeTab === 'new' ? 'Играть' : '',
    imageUrl: lottery.image.url,
    iconUrl: gameIcon,
    isHistory: activeTab === 'history',
    status: lottery.status,
    isUserRegistered: lottery.isUserRegistered || false,
    isCalculated: lottery.status !== 'draft' && lottery.status !== 'inProgress',
  }));

  return (
    <div className={styles.container}>
      {/* Контент */}
      <div className={styles.content}>
        {/* Заголовок */}
        <h1 className={styles.title}>Игровая комната</h1>

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

        {/* Список игр */}
        <div className={styles.gamesList}>
          {isLoading ? (
            <div className={styles.loading}>Загрузка...</div>
          ) : gameCards.length === 0 ? (
            <div className={styles.empty}>Нет доступных игр</div>
          ) : (
            gameCards.map((game) => (
              <GameCard key={game.id} {...game} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

