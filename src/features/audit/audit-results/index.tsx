// components/audit-results.tsx
import React from 'react';
import styles from './styles/audit-results.module.scss';
import type { AuditResult } from '@/core/entities/audit';

interface AuditResultsProps {
  data: AuditResult;
  onDownloadReport: () => void;
}

export const AuditResults: React.FC<AuditResultsProps> = ({
  data,
  onDownloadReport
}) => {
  const getStatusIcon = (isValid: boolean) => isValid ? '✅' : '❌';
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const getStepIcon = (valid: boolean) => valid ? '✅' : '❌';

  return (
    <div className={styles.resultsSection}>
      {/* Заголовок с общим статусом */}
      <div className={styles.resultsHeader}>
        <h2 className={styles.title}>
          {getStatusIcon(data.verification.isValid)} 
          {data.verification.isValid ? ' Аудит пройден успешно' : ' Обнаружены аномалии'}
        </h2>
        <p className={styles.subtitle}>
          {data.verification.isValid 
            ? 'Проверка честности розыгрыша завершена' 
            : `Обнаружено аномалий: ${data.verification.anomaliesCount} (критических: ${data.verification.criticalAnomalies})`
          }
        </p>
      </div>

      <div className={styles.resultsGrid}>
        {/* Статус верификации */}
        <div className={styles.resultCard}>
          <h3 className={styles.cardTitle}>📊 Статус проверки</h3>
          <div className={styles.verificationStatus}>
            <div className={styles.statusItem}>
              <span>Общий результат:</span>
              <strong className={data.verification.isValid ? styles.statusValid : styles.statusInvalid}>
                {data.verification.isValid ? 'ПРОЙДЕН' : 'НЕ ПРОЙДЕН'}
              </strong>
            </div>
            <div className={styles.statusItem}>
              <span>Всего аномалий:</span>
              <strong>{data.verification.anomaliesCount}</strong>
            </div>
            <div className={styles.statusItem}>
              <span>Критические:</span>
              <strong className={styles.criticalCount}>{data.verification.criticalAnomalies}</strong>
            </div>
            <div className={styles.statusItem}>
              <span>Предупреждения:</span>
              <strong>{data.verification.warnings}</strong>
            </div>
          </div>
        </div>

        {/* Сравнение calculated vs official */}
        <div className={styles.resultCard}>
          <h3 className={styles.cardTitle}>⚖️ Сравнение данных</h3>
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonItem}>
              <span>Seed Hash:</span>
              <div className={styles.comparisonValues}>
                <code className={data.calculated.seedHash === data.official.seedHash ? styles.match : styles.mismatch}>
                  {data.calculated.seedHash.slice(0, 20)}...
                </code>
                <span className={styles.comparisonArrow}>→</span>
                <code className={data.calculated.seedHash === data.official.seedHash ? styles.match : styles.mismatch}>
                  {data.official.seedHash.slice(0, 20)}...
                </code>
              </div>
            </div>
            <div className={styles.comparisonItem}>
              <span>Final Seed:</span>
              <div className={styles.comparisonValues}>
                <code className={data.calculated.finalSeed === data.official.finalSeed ? styles.match : styles.mismatch}>
                  {data.calculated.finalSeed.slice(0, 20)}...
                </code>
                <span className={styles.comparisonArrow}>→</span>
                <code className={data.calculated.finalSeed === data.official.finalSeed ? styles.match : styles.mismatch}>
                  {data.official.finalSeed.slice(0, 20)}...
                </code>
              </div>
            </div>
            <div className={styles.comparisonItem}>
              <span>Выигрышные бочонки:</span>
              <div className={styles.barrelsComparison}>
                <span className={styles.barrelsCount}>
                  {data.calculated.winningBarrels.length} шт.
                </span>
                <span className={styles.comparisonArrow}>→</span>
                <span className={styles.barrelsCount}>
                  {data.official.winningBarrels.length} шт.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Результаты розыгрыша */}
        <div className={styles.resultCard}>
          <h3 className={styles.cardTitle}>🎯 Выигрышные бочонки</h3>
          <div className={styles.barrelsSection}>
            <div className={styles.barrelsHeader}>
              <span>Рассчитанные:</span>
              <span>Официальные:</span>
            </div>
            <div className={styles.barrelsGrid}>
              <div className={styles.barrelsList}>
                {data.calculated.winningBarrels.map((barrel, index) => (
                  <span 
                    key={index} 
                    className={
                      data.official.winningBarrels.includes(barrel) 
                        ? styles.barrelMatch 
                        : styles.barrelMismatch
                    }
                  >
                    {barrel}
                  </span>
                ))}
              </div>
              <div className={styles.barrelsList}>
                {data.official.winningBarrels.map((barrel, index) => (
                  <span 
                    key={index} 
                    className={
                      data.calculated.winningBarrels.includes(barrel) 
                        ? styles.barrelMatch 
                        : styles.barrelMismatch
                    }
                  >
                    {barrel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Шаги проверки */}
        <div className={styles.resultCard}>
          <h3 className={styles.cardTitle}>🔧 Шаги проверки</h3>
          <div className={styles.stepsList}>
            {data.steps.map((step) => (
              <div key={step.step} className={styles.stepItem}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>Шаг {step.step}</span>
                  <span className={getStepIcon(step.valid) === '✅' ? styles.stepValid : styles.stepInvalid}>
                    {getStepIcon(step.valid)}
                  </span>
                </div>
                <div className={styles.stepName}>{step.name}</div>
                <div className={styles.stepFormula}>{step.formula}</div>
                <div className={styles.stepOutput}>
                  <code>{step.output.slice(0, 30)}...</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Аномалии (если есть) */}
        {data.anomalies.length > 0 && (
          <div className={styles.resultCard}>
            <h3 className={styles.cardTitle}>🚨 Обнаруженные аномалии</h3>
            <div className={styles.anomaliesList}>
              {data.anomalies.map((anomaly, index) => (
                <div key={index} className={`${styles.anomalyItem} ${styles[anomaly.severity]}`}>
                  <div className={styles.anomalyHeader}>
                    <span className={styles.anomalyIcon}>
                      {getSeverityIcon(anomaly.severity)}
                    </span>
                    <span className={styles.anomalyType}>{anomaly.type}</span>
                    <span className={styles.anomalySeverity}>{anomaly.severity}</span>
                  </div>
                  <div className={styles.anomalyDescription}>{anomaly.description}</div>
                  <div className={styles.anomalyDetails}>
                    <div className={styles.anomalyExpected}>
                      <span>Ожидалось:</span>
                      <code>{anomaly.expected}</code>
                    </div>
                    <div className={styles.anomalyActual}>
                      <span>Получено:</span>
                      <code>{anomaly.actual}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Детали энтропии */}
        <div className={styles.resultCard}>
          <h3 className={styles.cardTitle}>🎲 Источники энтропии</h3>
          <div className={styles.entropyDetails}>
            <div className={styles.entropyItem}>
              <span>Drand Randomness:</span>
              <code>{data.official.drandRandomness.slice(0, 25)}...</code>
            </div>
            <div className={styles.entropyItem}>
              <span>Игроков:</span>
              <strong>{data.calculated.playerEntropies.length}</strong>
            </div>
            <div className={styles.playerEntropies}>
              {data.calculated.playerEntropies.map((entropy, index) => (
                <div key={index} className={styles.playerEntropy}>
                  <span>Игрок {index + 1}:</span>
                  <code>{entropy.slice(0, 20)}...</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className={styles.actionsSection}>
        <button
          className={styles.downloadButton}
          onClick={onDownloadReport}
        >
          <span className={styles.downloadIcon}>📥</span>
          Скачать полный отчет
        </button>
        <button
          className={styles.backToTopButton}
          onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
        >
          ↑ Наверх к форме
        </button>
      </div>

      <p className={styles.downloadHint}>
        Отчет включает все данные проверки, результаты и технические детали
      </p>
    </div>
  );
};