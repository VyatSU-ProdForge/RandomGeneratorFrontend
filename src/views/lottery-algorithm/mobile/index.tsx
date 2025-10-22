import React from 'react';
import { useLotteryAlgorithm } from '../hooks/use-lottery-algorithm';
import { Modal } from '@/components/composite/modal';
import styles from './styles/lottery-algorithm-mobile.module.scss';

export const LotteryAlgorithmMobile: React.FC = () => {
  const { algorithmData, isLoading, handleBack, updateData } = useLotteryAlgorithm();
  const [selectedStep, setSelectedStep] = React.useState<number | null>(null);

  const handleStepClick = (stepIndex: number): void => {
    setSelectedStep(stepIndex);
  };

  const handleCloseModal = (): void => {
    setSelectedStep(null);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Назад
          </button>

          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загружаем алгоритм...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!algorithmData) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Назад
          </button>

          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>⚠️</div>
                <p className={styles.errorText}>Не удалось загрузить данные</p>
                <button 
                  className={styles.retryButton}
                  onClick={() => updateData()}
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Назад
        </button>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h1 className={styles.title}>{algorithmData.algorithm_name}</h1>
            <p className={styles.subtitle}>
              {algorithmData?.algorithm_type} • v{algorithmData.version}
            </p>

            <div className={styles.stepsList}>
              {algorithmData?.stages?.map((stage, index) => (
                <div 
                  key={stage.stage}
                  className={styles.stepCard}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={styles.stepNumber}>{stage.stage}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{stage.name}</h3>
                    <p className={styles.stepDescription}>{stage.short_description}</p>
                  </div>
                  <div className={styles.stepArrow}>→</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedStep !== null && (
        <Modal 
          isOpen={selectedStep !== null}
          onClose={handleCloseModal}
        >
          <div className={styles.modalContent}>
            <h3>{algorithmData?.stages[selectedStep].name}</h3>
            <p>{algorithmData?.stages[selectedStep].detailed_description}</p>
            
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ marginBottom: '8px' }}>Backend шаги:</h4>
              <ul>
                {algorithmData?.stages[selectedStep].steps.backend.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ marginBottom: '8px' }}>Frontend шаги:</h4>
              <ul>
                {algorithmData?.stages[selectedStep].steps.frontend.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};