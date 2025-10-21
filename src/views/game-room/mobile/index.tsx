import React from 'react';
import { GameCard } from '@components/composite/game-card';
import logo from '@app/assets/images/logo.svg';
import gameCardBg from '@app/assets/images/game-card-bg.jpg';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './game-room-mobile.module.scss';

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
      {/* Хедер с логотипом */}
      <header className={styles.header}>
        <div className={styles.logoCard}>
          <img src={logo} alt="СТОЛОТО" className={styles.logo} />
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.date}>Вторник, 21 октября</span>
          <button className={styles.loginButton}>Выход</button>
        </div>
      </header>

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

