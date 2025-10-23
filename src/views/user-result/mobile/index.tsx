import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useServicesContext } from '@/providers/use-services-context';
import type { UserLotteryResults } from '@/data/api/repositories/lottery-repository';
import { RoutePath } from '@app/navigation/routes';
import gameIcon from '@app/assets/images/game-icon.png';
import styles from './styles/user-result-mobile.module.scss';

export function UserResultMobile(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { lotteryService } = useServicesContext();
  const [result, setResult] = React.useState<UserLotteryResults | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadResults = async (): Promise<void> => {
      if (!id) return;

      try {
        setIsLoading(true);
        const resultsData = await lotteryService.getUserLotteryResults(Number(id));
        console.log('User results data:', resultsData);
        setResult(resultsData);
      } catch (error: any) {
        console.error('Ошибка загрузки результатов:', error);
        console.error('Error response:', error.response?.data);
        alert('Ошибка при загрузке результатов лотереи');
      } finally {
        setIsLoading(false);
      }
    };

    void loadResults();
  }, [id, lotteryService]);

  const handleBack = (): void => {
    void navigate(RoutePath.GameRoom);
  };

  const isBarrelMatched = (barrel: number): boolean => {
    if (!result || !(result as any).barrels?.matched) return false;
    return (result as any).barrels.matched.includes(barrel);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loading}>Загрузка результатов...</div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.error}>Результаты не найдены</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Кнопка "На главную" */}
        <button className={styles.backButton} onClick={handleBack}>
          ← На главную
        </button>

        {/* Карточка с результатами */}
        <div className={styles.card}>
          <h1 className={styles.title}>Результаты игры</h1>

          {/* Информация об игре */}
          <div className={styles.gameInfo}>
            <img src={gameIcon} alt="" className={styles.gameIcon} />
            <h2 className={styles.gameName}>{result.lottery.name}</h2>
          </div>

          {/* Статус завершения */}
          <div className={styles.statusBadge}>
            Завершена {new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })}
          </div>

          {/* Суперприз - нужно получить из основных данных лотереи */}
          <div className={styles.prize}>
            <span className={styles.prizeLabel}>Суперприз:</span>
            <span className={styles.prizeAmount}>7 000 000 руб</span>
          </div>

          {/* Описание */}
          <p className={styles.description}>
            Испытайте удачу в легендарных лотереях!
          </p>

          {/* Ваши номера */}
          {(result as any).barrels?.player && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Ваши номера:</h3>
              <div className={styles.playerBarrels}>
                {(result as any).barrels.player.map((barrel: number) => (
                  <div 
                    key={barrel} 
                    className={`${styles.playerBarrel} ${isBarrelMatched(barrel) ? styles.matched : ''}`}
                  >
                    {barrel}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Выигрышные номера */}
          {(result as any).barrels?.winning && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Выигрышные номера:</h3>
              <div className={styles.winningBarrels}>
                {(result as any).barrels.winning.map((barrel: number) => (
                  <div key={barrel} className={styles.winningBarrel}>
                    {barrel}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Данные верификации */}
          {result.audit?.verification_data && (
            <div className={styles.verificationSection}>
              <div className={styles.field}>
                <label className={styles.label}>Идентификатор лотереи</label>
                <div className={styles.value}>{result.audit.verification_data.lotteryId}</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Сид</label>
                <div className={styles.value}>{result.audit.verification_data.seed}</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Истинно сгенерированное рандомное число</label>
                <div className={styles.value}>{result.audit.verification_data.drandRandomness}</div>
              </div>

              {result.audit.verification_data.playerEntropies && (
                <div className={styles.field}>
                  <label className={styles.label}>Энтропии пользователей</label>
                  <div className={styles.entropiesList}>
                    {result.audit.verification_data.playerEntropies.map((entropy: string, index: number) => (
                      <div key={index} className={styles.entropyValue}>
                        {entropy}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>Лимит выигрышных бочек</label>
                <div className={styles.value}>{result.audit.verification_data.barrelLimit}</div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Количество бочек</label>
                <div className={styles.value}>{result.audit.verification_data.barrelCount}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

