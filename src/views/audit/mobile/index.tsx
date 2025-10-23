import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServicesContext } from '@/providers/use-services-context';
import styles from './styles/audit-mobile.module.scss';
import { AuditResults } from '@/features/audit/audit-results';
import type { AuditRequest } from '@/data/api/repositories/audit-repository';
import type { AuditResult } from '@/core/entities/audit';

export const AuditMobile: React.FC = () => {
  const navigate = useNavigate();
  const { auditService } = useServicesContext();
  
  const [formData, setFormData] = useState<AuditRequest>({
    lotteryId: 0,
    seed: '',
    drandRandomness: '',
    playerEntropies: [''],
    barrelLimit: 90,
    barrelCount: 7
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const handleBack = (): void => {
    navigate(-1);
  };

  const handleInputChange = (field: keyof AuditRequest, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const handlePlayerEntropyChange = (index: number, value: string): void => {
    const newEntropies = [...formData.playerEntropies];
    newEntropies[index] = value;
    setFormData(prev => ({
      ...prev,
      playerEntropies: newEntropies
    }));
  };

  const addPlayerEntropy = (): void => {
    setFormData(prev => ({
      ...prev,
      playerEntropies: [...prev.playerEntropies, '']
    }));
  };

  const removePlayerEntropy = (index: number): void => {
    if (formData.playerEntropies.length > 1) {
      const newEntropies = formData.playerEntropies.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        playerEntropies: newEntropies
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.lotteryId || formData.lotteryId <= 0) {
      setError('Введите корректный ID лотереи');
      return false;
    }
    if (!formData.seed.trim()) {
      setError('Введите seed');
      return false;
    }
    if (!formData.drandRandomness.trim()) {
      setError('Введите случайность от Drand');
      return false;
    }
    if (formData.playerEntropies.some(entropy => !entropy.trim())) {
      setError('Все поля энтропии игроков должны быть заполнены');
      return false;
    }
    if (formData.barrelLimit <= 0) {
      setError('Лимит бочонков должен быть положительным числом');
      return false;
    }
    if (formData.barrelCount <= 0 || formData.barrelCount < formData.barrelLimit) {
      setError('Количество бочонков должно быть положительным и превышать лимит');
      return false;
    }
    return true;
  };

  const handleProcessAudit = async (): Promise<void> => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Отправляем запрос на сервер
      const result = await auditService.getAuditService(formData);
      
      // Сетим результат
      setAuditResult(result);
      setShowResults(true);
      
      // Автоскролл к результатам
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
    } catch (err: any) {
      // Обрабатываем ошибку
      setError(err.message || 'Произошла ошибка при проверке аудита');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!auditResult) return;
  
    window.open(auditResult.randomnessTestFileUrl.url, '_blank');
  };
  
  
  


  return (
    <div className={styles.container}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundGradient} />
      </div>

      <div className={styles.content}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Назад
        </button>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <h1 className={styles.title}>Аудит лотереи</h1>
              <p className={styles.subtitle}>
                Проверьте честность и прозрачность проведения розыгрыша
              </p>
            </div>

            <div className={styles.formSection}>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    ID лотереи *
                  </label>
                  <input
                    type="number"
                    className={styles.input}
                    value={formData.lotteryId}
                    onChange={(e) => handleInputChange('lotteryId', parseInt(e.target.value) || 0)}
                    placeholder="Введите числовой ID лотереи"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Seed *
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.seed}
                    onChange={(e) => handleInputChange('seed', e.target.value)}
                    placeholder="Введите seed (UUID или хеш)"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Drand случайность *
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.drandRandomness}
                    onChange={(e) => handleInputChange('drandRandomness', e.target.value)}
                    placeholder="Введите случайность от Drand"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Лимит бочонков *
                  </label>
                  <input
                    type="number"
                    className={styles.input}
                    value={formData.barrelLimit}
                    onChange={(e) => handleInputChange('barrelLimit', parseInt(e.target.value) || 0)}
                    placeholder="Обычно 90"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Количество бочонков *
                  </label>
                  <input
                    type="number"
                    className={styles.input}
                    value={formData.barrelCount}
                    onChange={(e) => handleInputChange('barrelCount', parseInt(e.target.value) || 0)}
                    placeholder="Количество для розыгрыша"
                  />
                </div>
              </div>

              <div className={styles.entropySection}>
                <div className={styles.entropyHeader}>
                  <label className={styles.label}>
                    Энтропии игроков *
                  </label>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={addPlayerEntropy}
                  >
                    + Добавить игрока
                  </button>
                </div>
                
                {formData.playerEntropies.map((entropy, index) => (
                  <div key={index} className={styles.entropyRow}>
                    <input
                      type="text"
                      className={styles.input}
                      value={entropy}
                      onChange={(e) => handlePlayerEntropyChange(index, e.target.value)}
                      placeholder={`Энтропия игрока ${index + 1} (хеш)`}
                    />
                    {formData.playerEntropies.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removePlayerEntropy(index)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}
            </div>

            <div className={styles.actionSection}>
              <button
                className={`${styles.primaryButton} ${isLoading ? styles.loading : ''}`}
                onClick={handleProcessAudit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className={styles.buttonSpinner}></div>
                    Проверяем...
                  </>
                ) : (
                  <>
                    <span className={styles.buttonIcon}>🔍</span>
                    Запустить проверку аудита
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Секция с результатами */}
      <div ref={resultsRef}>
        {showResults && auditResult && (
          <AuditResults
            data={auditResult}
            onDownloadReport={handleDownloadReport}
          />
        )}
      </div>
    </div>
  );
};