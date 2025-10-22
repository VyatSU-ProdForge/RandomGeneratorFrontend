import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@app/navigation/routes';
import { type IGameCard } from '../interfaces';
import gameCardBg from '@app/assets/images/game-card-bg.png';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/my-games-desktop.module.scss';

export function MyGamesDesktop(): React.ReactElement {
  const navigate = useNavigate();

  // Моковые данные - потом придут с бэка
  const myGames: IGameCard[] = [
    {
      id: '1',
      name: 'Рапидо Про',
      drawNumber: 'Тираж №344299',
      jackpot: '7 000 000 руб',
      description: 'Испытайте удачу в легендарных лотереях!',
      timeLeft: 'Осталось 12ч: 23мин',
      imageUrl: gameCardBg,
      iconUrl: gameIcon,
    },
  ];

  const handleBack = (): void => {
    void navigate(RoutePath.GameRoom);
  };

  const handleGameClick = (id: string): void => {
    void navigate(`/game-step/first/${id}`);
  };

  return (
    <div className={styles.container}>
      {/* Кнопка "На главную" */}
      <button className={styles.backButton} onClick={handleBack}>
        <span className={styles.arrow}>←</span>
        <span className={styles.backText}>На главную</span>
      </button>

      {/* Заголовок */}
      <h1 className={styles.title}>Мои игры</h1>

      {/* Список игр */}
      <div className={styles.gamesList}>
        {myGames.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              <img src={game.imageUrl} alt={game.name} className={styles.cardImage} />
              <div className={styles.imageOverlay} />
              <img src={game.iconUrl} alt="" className={styles.gameIcon} />
            </div>

            {/* Контент */}
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <img src={game.iconUrl} alt="" className={styles.headerIcon} />
                <h3 className={styles.gameName}>{game.name}</h3>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Суперприз:</span>
                  <span className={styles.value}>{game.jackpot}</span>
                </div>
                <p className={styles.description}>{game.description}</p>
                <p className={styles.timeLeft}>{game.timeLeft}</p>
              </div>

              <button className={styles.playButton} onClick={(): void => handleGameClick(game.id)}>
                Перейти к игре
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

