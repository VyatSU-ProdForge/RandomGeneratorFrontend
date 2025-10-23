import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '@components/simple/app-button';
import styles from './styles/game-card.module.scss';

interface IGameCardProps {
  id: string;
  name: string;
  drawNumber: string;
  jackpot: string;
  description: string;
  timeLeft: string;
  price: string;
  imageUrl: string;
  iconUrl?: string;
  isHistory?: boolean;
  status?: 'draft' | 'inProgress' | 'finished';
  isUserRegistered?: boolean;
  isCalculated?: boolean;
}

export function GameCard({
  id,
  name,
  drawNumber,
  jackpot,
  description,
  timeLeft,
  price,
  imageUrl,
  iconUrl,
  isHistory = false,
  status = 'draft',
  isUserRegistered = false,
  isCalculated = false,
}: IGameCardProps): React.ReactElement {
  const navigate = useNavigate();

  const handlePlayClick = (): void => {
    // Если пользователь зарегистрирован и игра рассчитана - переходим к результатам
    if (isUserRegistered && isCalculated) {
      void navigate(`/user-result/${id}`);
    } else {
      // Иначе переходим к выбору бочек
      void navigate(`/lottery/${id}`);
    }
  };
  
  const getButtonText = (): string => {
    if (isUserRegistered) {
      if (isCalculated) {
        return 'Посмотреть результаты';
      }
      return 'Дождитесь окончания лотереи';
    }
    return price;
  };
  
  // Кнопка активна если статус 'inProgress' и пользователь НЕ зарегистрирован
  // ИЛИ если пользователь зарегистрирован и игра рассчитана
  const isPlayable = (status === 'inProgress' && !isUserRegistered) || (isUserRegistered && isCalculated);
  
  return (
    <div className={styles.card}>
      {/* Картинка сверху */}
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>

      {/* Контент карточки */}
      <div className={styles.content}>
        {/* Иконка и название */}
        <div className={styles.header}>
          {iconUrl && (
            <img src={iconUrl} alt={name} className={styles.icon} />
          )}
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.drawNumber}>{drawNumber}</p>
          </div>
        </div>

        {/* Суперприз */}
        <div className={styles.jackpot}>
          <span className={styles.jackpotLabel}>Суперприз:</span>
          <span className={styles.jackpotAmount}>{jackpot}</span>
        </div>

        {/* Описание */}
        <p className={styles.description}>{description}</p>

        {/* Таймер */}
        <p className={styles.timer}>{timeLeft}</p>

        {/* Кнопка */}
        {isHistory ? (
          <div className={styles.unavailable}>
            Недоступно
          </div>
        ) : (
          <AppButton 
            variant="primary" 
            fullWidth 
            onClick={handlePlayClick}
            disabled={!isPlayable}
          >
            {getButtonText()}
          </AppButton>
        )}
      </div>
    </div>
  );
}

