import React from 'react';
import styles from './styles/step-indicator.module.scss';

interface IStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: IStepIndicatorProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Шаг №{currentStep}</h2>
      <div className={styles.progressBar}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`${styles.step} ${index < currentStep ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

