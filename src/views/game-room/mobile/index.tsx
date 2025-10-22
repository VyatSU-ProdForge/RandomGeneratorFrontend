import React from 'react';
import { GameCard } from '@components/composite/game-card';
import gameCardBg from '@app/assets/images/game-card-bg.png';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/game-room-mobile.module.scss';

export function GameRoomMobile(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<'new' | 'history'>('new');

  // Моковые данные - потом придут с бэка
  const newGames = [
    {
      id: '1',
      name: 'Рапидо Про',
      drawNumber: 'Тираж №344299',
      jackpot: '7 000 000 руб',
      description: 'Испытайте удачу в легендарных лотереях!',
      timeLeft: 'Осталось 12ч: 23мин',
      price: 'Играть | 250 руб.',
      imageUrl: gameCardBg,
      iconUrl: gameIcon,
    },
  ];

  const historyGames = [
    {
      id: '2',
      name: 'Рапидо Про',
      drawNumber: 'Тираж №344299',
      jackpot: '7 000 000 руб',
      description: 'Испытайте удачу в легендарных лотереях!',
      timeLeft: 'Завершено',
      price: '',
      imageUrl: gameCardBg,
      iconUrl: gameIcon,
      isHistory: true,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Контент */}
      <div className={styles.content}>
        {/* Заголовок */}
        <h1 className={styles.title}>Игровая комната</h1>

        {/* Кнопка "Мои игры" */}
        <button className={styles.myGamesButton}>
          <span>Мои игры</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

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
          {activeTab === 'new' && newGames.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
          {activeTab === 'history' && historyGames.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}

