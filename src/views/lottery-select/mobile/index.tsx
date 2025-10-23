import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@app/layout/header';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import { useServicesContext } from '@/providers/use-services-context';
import type { Lottery } from '@/data/api/repositories/lottery-repository';
import gameCardBg from '@app/assets/images/game-card-bg.png';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/lottery-select-mobile.module.scss';

export function LotterySelectMobile(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { lotteryService } = useServicesContext();
  const [selectedNumbers, setSelectedNumbers] = React.useState<number[]>([]);
  const [lottery, setLottery] = React.useState<Lottery | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Загрузка данных лотереи
  React.useEffect(() => {
    const loadLottery = async (): Promise<void> => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await lotteryService.getLotteryById(Number(id));
        setLottery(data);
      } catch (error) {
        console.error('Ошибка загрузки лотереи:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadLottery();
  }, [id, lotteryService]);

  const handleBack = (): void => {
    void navigate(RoutePath.GameRoom);
  };

  const handleNumberClick = (num: number): void => {
    if (!lottery) return;
    
    setSelectedNumbers(prev => {
      if (prev.includes(num)) {
        return prev.filter(n => n !== num);
      }
      
      // Проверяем лимит
      if (prev.length >= lottery.metadata.barrelLimit) {
        return prev;
      }
      
      return [...prev, num];
    });
  };

  const handleRandomNumbers = (): void => {
    if (!lottery) return;
    
    const barrelCount = lottery.metadata.barrelCount;
    const barrelLimit = lottery.metadata.barrelLimit;
    
    // Генерируем случайное количество от 1 до barrelLimit
    const count = Math.floor(Math.random() * barrelLimit) + 1;
    const numbers: number[] = [];
    
    while (numbers.length < count) {
      const random = Math.floor(Math.random() * barrelCount) + 1;
      if (!numbers.includes(random)) {
        numbers.push(random);
      }
    }
    
    setSelectedNumbers(numbers);
  };

  const handleNextStep = (): void => {
    if (!canProceed || !id) return;
    
    // Переходим на страницу генерации, передавая выбранные бочки
    void navigate(`/game-step/first/${id}`, {
      state: { selectedNumbers, lotteryId: Number(id) }
    });
  };

  const formatTimeLeft = (endAt: string): string => {
    const end = new Date(endAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return '0ч : 0мин';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}ч : ${minutes}мин`;
  };

  const formatAmount = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const canProceed = selectedNumbers.length >= 1;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <img src={gameCardBg} alt="" className={styles.backgroundImage} />
          <div className={styles.backgroundGradient} />
        </div>
        <div className={styles.headerWrapper}>
          <Header transparent={true} />
        </div>
        <div className={styles.content}>
          <div className={styles.loading}>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!lottery) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <img src={gameCardBg} alt="" className={styles.backgroundImage} />
          <div className={styles.backgroundGradient} />
        </div>
        <div className={styles.headerWrapper}>
          <Header transparent={true} />
        </div>
        <div className={styles.content}>
          <div className={styles.empty}>Лотерея не найдена</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Фоновое изображение */}
      <div className={styles.backgroundWrapper}>
        <img src={gameCardBg} alt="" className={styles.backgroundImage} />
        <div className={styles.backgroundGradient} />
      </div>

      {/* Хедер */}
      <div className={styles.headerWrapper}>
        <Header transparent={true} />
      </div>

      {/* Контент */}
      <div className={styles.content}>
        {/* Кнопка "На главную" */}
        <button className={styles.backButton} onClick={handleBack}>
          ← На главную
        </button>

        {/* Карточка игры */}
        <div className={styles.card}>
          <h1 className={styles.title}>Игра на старт!</h1>

          {/* Информация об игре */}
          <div className={styles.gameInfo}>
            <div className={styles.gameHeader}>
              <img src={gameIcon} alt="" className={styles.gameIcon} />
              <h2 className={styles.gameName}>{lottery.name}</h2>
            </div>
            <div className={styles.timer}>{formatTimeLeft(lottery.endAt)}</div>
          </div>

          {/* Суперприз */}
          <div className={styles.prize}>
            <span className={styles.prizeLabel}>Суперприз:</span>
            <span className={styles.prizeAmount}>{formatAmount(lottery.amount)} руб</span>
          </div>

          {/* Описание */}
          <p className={styles.description}>
            {lottery.description}
          </p>

          {/* Билет */}
          <div className={styles.ticketSection}>
            <h3 className={styles.ticketTitle}>Билет</h3>
            <p className={styles.ticketHint}>Выберите от 1 до {lottery.metadata.barrelLimit} {lottery.metadata.barrelLimit === 1 ? 'число' : 'чисел'}</p>
          </div>

          {/* Сетка чисел */}
          <div className={styles.numbersGrid}>
            {Array.from({ length: lottery.metadata.barrelCount }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`${styles.numberButton} ${selectedNumbers.includes(num) ? styles.selected : ''}`}
                onClick={(): void => handleNumberClick(num)}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Кнопка случайное число */}
          <AppButton
            variant="primary"
            fullWidth
            onClick={handleRandomNumbers}
          >
            Случайное число
          </AppButton>

          {/* Кнопка перехода к следующему шагу */}
          <AppButton
            variant="secondary"
            fullWidth
            disabled={!canProceed}
            onClick={handleNextStep}
          >
            К следующему шагу
          </AppButton>
        </div>
      </div>
    </div>
  );
}

