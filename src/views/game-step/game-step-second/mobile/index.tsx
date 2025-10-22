import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '@components/simple/app-button';
import { StepIndicator } from '@components/simple/step-indicator';
import { Header } from '@app/layout/header';
import gameCardBg from '@app/assets/images/game-card-bg.png';
import micIdleSvg from '@app/assets/images/mic-idle.svg';
import micRecordingSvg from '@app/assets/images/mic-recording.svg';
import reloadSvg from '@app/assets/images/reload.svg';
import styles from './styles/game-step-second-mobile.module.scss';

type RecordingState = 'idle' | 'recording' | 'completed';

export function GameStepSecondMobile(): React.ReactElement {
  const navigate = useNavigate();
  const [recordingState, setRecordingState] = React.useState<RecordingState>('idle');
  const [recordingTime, setRecordingTime] = React.useState<number>(0);
  const recordingTimerRef = React.useRef<number | null>(null);
  const [encryptedValue, setEncryptedValue] = React.useState<string>('');

  const handleBack = (): void => {
    void navigate(-1);
  };

  const handleStartRecording = (): void => {
    setRecordingState('recording');
    setRecordingTime(0);
    
    recordingTimerRef.current = window.setInterval(() => {
      setRecordingTime((prev: number) => {
        if (prev >= 60) {
          handleStopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = (): void => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    const mockEncrypted = '9f3b7a2d4e1c8f56a0b9d3e7f4c2a1b68' +
                          '7d5e3f490a6c1b2f8e4d7359a0c2b';
    setEncryptedValue(mockEncrypted);
    setRecordingState('completed');
  };

  const handleRecordingToggle = (): void => {
    if (recordingState === 'idle') {
      handleStartRecording();
    } else if (recordingState === 'recording') {
      handleStopRecording();
    }
  };

  const handleReRecord = (): void => {
    setRecordingState('idle');
    setRecordingTime(0);
    setEncryptedValue('');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  React.useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundWrapper}>
        <img src={gameCardBg} alt="" className={styles.backgroundImage} />
        <div className={styles.backgroundGradient} />
      </div>

      <div className={styles.headerWrapper}>
        <Header showDate={false} showMenuButton={false} transparent={true} />
      </div>

      <div className={styles.content}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Назад
        </button>

        <div className={`${styles.card} ${recordingState === 'recording' ? styles.cardBlurred : ''}`}>
          <div className={styles.cardContent}>
            <h1 className={styles.title}>Генерация случайного числа</h1>
            <p className={styles.subtitle}>
              Пройди 2 шага, чтобы получить истинную случайность для участия в розыгрыше.
            </p>

            <StepIndicator currentStep={2} totalSteps={2} />

            <p className={styles.instruction}>
              Запишите кодовую фразу голосом, она поможет сгенерировать число.
            </p>

            <div className={styles.microphonePlaceholder} />

            <div className={styles.encryptedSection}>
              <label className={styles.encryptedLabel}>Зашифрованное значение</label>
              <div className={styles.encryptedValue}>
                {encryptedValue || 'Здесь будет записана зашифрованная часть сгенерированного числа'}
              </div>
            </div>

            {recordingState === 'completed' && (
              <AppButton
                variant="primary"
                fullWidth
              >
                К следующему шагу
              </AppButton>
            )}
          </div>

          <div className={styles.recordingWrapper}>
            {recordingState === 'completed' ? (
              <>
                <button className={styles.reRecordButton} onClick={handleReRecord}>
                  <img src={reloadSvg} alt="Re-record" className={styles.reRecordIcon} />
                </button>

                <p className={styles.recordingHint}>Запись завершена</p>

                <p className={styles.reRecordHint}>
                  Нажмите, чтобы записать заново
                </p>

                <p className={styles.timer}>
                  {formatTime(recordingTime)}
                </p>
              </>
            ) : (
              <>
                <button
                  className={styles.micButton}
                  onClick={handleRecordingToggle}
                >
                  <img
                    src={recordingState === 'recording' ? micRecordingSvg : micIdleSvg}
                    alt="Microphone"
                    className={styles.micIcon}
                  />
                </button>

                <p className={styles.recordingHint}>Удерживайте и говорите</p>

                <p className={`${styles.timer} ${recordingState === 'recording' ? styles.timerActive : ''}`}>
                  {formatTime(recordingTime)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

