import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppButton } from '@components/simple/app-button';
import { RoutePath } from '@app/navigation/routes';
import gameCardBg from '@app/assets/images/game-card-bg.png';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/lottery-select-mobile.module.scss';

export function LotterySelectMobile(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedNumbers, setSelectedNumbers] = React.useState<number[]>([]);

  const handleBack = (): void => {
    void navigate(RoutePath.GameRoom);
  };

  const handleNumberClick = (num: number): void => {
    setSelectedNumbers(prev => 
      prev.includes(num) 
        ? prev.filter(n => n !== num)
        : [...prev, num]
    );
  };

  const handleRandomNumbers = (): void => {
    const numbers: number[] = [];
    while (numbers.length < 4) {
      const random = Math.floor(Math.random() * 28) + 1;
      if (!numbers.includes(random)) {
        numbers.push(random);
      }
    }
    setSelectedNumbers(numbers);
  };

  const canProceed = selectedNumbers.length >= 4;

  return (
    <div className={styles.container}>
      {/* Фоновое изображение */}
      <div className={styles.backgroundWrapper}>
        <img src={gameCardBg} alt="" className={styles.backgroundImage} />
        <div className={styles.backgroundGradient} />
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
              <h2 className={styles.gameName}>Рапидо Про</h2>
            </div>
            <div className={styles.timer}>12ч : 23мин</div>
          </div>

          {/* Суперприз */}
          <div className={styles.prize}>
            <span className={styles.prizeLabel}>Суперприз:</span>
            <span className={styles.prizeAmount}>7 000 000 руб</span>
          </div>

          {/* Описание */}
          <p className={styles.description}>
            Испытайте удачу в легендарных лотереях!
          </p>

          {/* Билет */}
          <div className={styles.ticketSection}>
            <h3 className={styles.ticketTitle}>Билет</h3>
            <p className={styles.ticketHint}>Выберите минимум 4 числа</p>
          </div>

          {/* Сетка чисел */}
          <div className={styles.numbersGrid}>
            {Array.from({ length: 28 }, (_, i) => i + 1).map((num) => (
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

          {/* Сумма к оплате */}
          <div className={styles.payment}>
            <span className={styles.paymentLabel}>Сумма к оплате</span>
            <span className={styles.paymentAmount}>0 руб.</span>
          </div>

          {/* Кнопка выполнения */}
          <AppButton
            variant="secondary"
            fullWidth
            disabled={!canProceed}
          >
            Выполните все действия
          </AppButton>
        </div>
      </div>
    </div>
  );
}

