import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppButton } from '@components/simple/app-button';
import { Header } from '@app/layout/header';
import { useServicesContext } from '@/providers/use-services-context';
import { RoutePath } from '@app/navigation/routes';
import gameCardBg from '@app/assets/images/game-card-bg.png';
import cursorSvg from '@app/assets/images/cursor.svg';
import styles from './styles/game-step-first-desktop.module.scss';

export function GameStepFirstDesktop(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { lotteryService } = useServicesContext();
  const [hasDrawing, setHasDrawing] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const drawingCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = React.useState<{ x: number; y: number } | null>(null);
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null);
  const cursorImageRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = cursorSvg;
    img.onload = (): void => {
      cursorImageRef.current = img;
    };
  }, []);

  React.useEffect(() => {
    const drawingCanvas = drawingCanvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;
    
    if (!drawingCanvas || !cursorCanvas) return;

    const drawingCtx = drawingCanvas.getContext('2d');
    const cursorCtx = cursorCanvas.getContext('2d');
    
    if (!drawingCtx || !cursorCtx) return;

    drawDotGrid(drawingCtx, drawingCanvas.width, drawingCanvas.height);

    const centerX = cursorCanvas.width / 2;
    const centerY = cursorCanvas.height / 2;
    setCursorPosition({ x: centerX, y: centerY });
  }, []);

  React.useEffect(() => {
    const canvas = cursorCanvasRef.current;
    if (!canvas || !cursorPosition) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCustomCursor(ctx, cursorPosition.x, cursorPosition.y);
  }, [cursorPosition]);

  const drawDotGrid = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
    const dotSpacing = 20;
    const dotRadius = 1.5;

    ctx.fillStyle = 'hsl(0deg 0% 85%)';

    for (let x = dotSpacing; x < width; x += dotSpacing) {
      for (let y = dotSpacing; y < height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawCustomCursor = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
    if (!cursorImageRef.current || !cursorCanvasRef.current) return;

    // Фиксированный размер курсора в canvas-координатах
    // Этот размер не зависит от CSS-масштабирования canvas
    const cursorSize = 24;
    
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(
      cursorImageRef.current,
      x - cursorSize / 2,
      y - cursorSize / 2,
      cursorSize,
      cursorSize
    );
    
    ctx.restore();
  };

  const handleBack = (): void => {
    void navigate(-1);
  };

  const handleCanvasInteraction = (): void => {
    if (!hasDrawing) {
      setHasDrawing(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!drawingCanvasRef.current) return;

    const canvas = drawingCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    lastPointRef.current = { x, y };
    setIsDrawing(true);
    handleCanvasInteraction();
  };

  const handleMouseUp = (): void => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!drawingCanvasRef.current) return;

    const canvas = drawingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    setCursorPosition({ x, y });

    if (isDrawing && lastPointRef.current) {
      ctx.strokeStyle = 'hsl(46deg 100% 50%)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPointRef.current = { x, y };
    }
  };

  const handleClearCanvas = (): void => {
    const drawingCanvas = drawingCanvasRef.current;
    if (!drawingCanvas) return;

    const drawingCtx = drawingCanvas.getContext('2d');
    if (!drawingCtx) return;

    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    drawDotGrid(drawingCtx, drawingCanvas.width, drawingCanvas.height);
    setHasDrawing(false);
  };

  const handleRegister = async (): Promise<void> => {
    if (!hasDrawing || !id || isSubmitting) return;

    const drawingCanvas = drawingCanvasRef.current;
    if (!drawingCanvas) return;

    // Получаем выбранные бочки из navigation state
    const state = location.state as { selectedNumbers: number[]; lotteryId: number } | null;
    if (!state || !state.selectedNumbers || state.selectedNumbers.length === 0) {
      alert('Выбранные бочки не найдены');
      return;
    }

    try {
      setIsSubmitting(true);

      // Конвертируем canvas в blob (JPG формат)
      const blob = await new Promise<Blob>((resolve, reject) => {
        drawingCanvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Не удалось создать изображение'));
          }
        }, 'image/jpeg', 0.95);
      });

      // Создаем файл из blob
      const file = new File([blob], 'drawing.jpg', { type: 'image/jpeg' });

      // Отправляем запрос на регистрацию
      await lotteryService.registerInLottery({
        lotteryId: Number(id),
        barrelsNumber: state.selectedNumbers,
        file,
      });

      // Успешная регистрация - переходим на главную
      alert('Вы успешно зарегистрированы в лотерее!');
      void navigate(RoutePath.GameRoom);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка при регистрации в лотерее');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h1 className={styles.title}>Генерация случайного числа</h1>

            <p className={styles.instruction}>
              Легким движением нарисуйте ваше уникальное изображение, которое приблизит вас к выигрышу
            </p>

            <div className={styles.canvasWrapper}>
              <canvas
                ref={drawingCanvasRef}
                className={styles.drawingArea}
                width={820}
                height={401}
              />
              <canvas
                ref={cursorCanvasRef}
                className={styles.cursorArea}
                width={820}
                height={401}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
              />
              {hasDrawing && (
                <button className={styles.clearButton} onClick={handleClearCanvas}>
                  Удалить
                </button>
              )}
            </div>

            <AppButton
              variant="primary"
              fullWidth
              disabled={!hasDrawing || isSubmitting}
              onClick={handleRegister}
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}

