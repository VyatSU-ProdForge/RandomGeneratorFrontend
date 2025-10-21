import React from 'react';
import { AppButton } from '@components/simple/app-button';
import styles from './game-card.module.scss';

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
}

export function GameCard({
  name,
  drawNumber,
  jackpot,
  description,
  timeLeft,
  price,
  imageUrl,
  iconUrl,
  isHistory = false,
}: IGameCardProps): React.ReactElement {
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
          <AppButton variant="primary" fullWidth>
            {price}
          </AppButton>
        )}
      </div>
    </div>
  );
}

