import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useServicesContext } from '@/providers/use-services-context';
import type { CalculateLotteryWinnersResponse } from '@/data/api/repositories/lottery-repository';
import { RoutePath } from '@app/navigation/routes';
import styles from './styles/game-result-mobile.module.scss';

export function GameResultMobile(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { lotteryService } = useServicesContext();
  const [result, setResult] = React.useState<CalculateLotteryWinnersResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadResults = async (): Promise<void> => {
      if (!id) return;

      try {
        setIsLoading(true);
        
        // Админ ВСЕГДА вызывает POST calculateLotteryWinners
        // Сервер сам определит - нужно рассчитывать или вернуть готовое
        const latestResponse = await fetch('https://drand.cloudflare.com/public/latest');
        const latestData = await latestResponse.json();
        
        const winnersData = await lotteryService.calculateLotteryWinners({
          lotteryId: Number(id),
          drandRandomness: latestData.randomness,
        });
        
        console.log('Admin results:', winnersData);
        setResult(winnersData);
      } catch (error: any) {
        console.error('Ошибка получения результатов:', error);
        alert('Ошибка при получении результатов');
      } finally {
        setIsLoading(false);
      }
    };

    void loadResults();
  }, [id, lotteryService]);

  const handleBack = (): void => {
    void navigate(RoutePath.Admin);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loading}>Подведение итогов...</div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.error}>Не удалось подвести итоги</div>
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
          <h1 className={styles.title}>Информация об игре</h1>

          {/* Выигрышные номера */}
          <div className={styles.winnersSection}>
            <h2 className={styles.sectionTitle}>Выигрышные номера:</h2>
            <div className={styles.barrels}>
              {result.calculation.winningBarrels.map((barrel) => (
                <div key={barrel} className={styles.barrel}>
                  {barrel}
                </div>
              ))}
            </div>
          </div>

          {/* Данные верификации */}
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

            <div className={styles.field}>
              <label className={styles.label}>Лимит выигрышных бочек</label>
              <div className={styles.value}>{result.audit.verification_data.barrelLimit}</div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Количество бочек</label>
              <div className={styles.value}>{result.audit.verification_data.barrelCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

