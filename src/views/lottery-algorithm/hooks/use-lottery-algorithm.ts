import { useServicesContext } from '@/providers/use-services-context';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AlgorithmData } from '@/core/entities/algortihm';

export const useLotteryAlgorithm = () => {
  const navigate = useNavigate();
  const { algorithmService } = useServicesContext();
  const [algorithmData, setAlgorithmData] = useState<AlgorithmData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAlgorithm = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await algorithmService.getAlgorithm();
      setAlgorithmData(response);
    } catch (err) {
      setError('Не удалось загрузить данные алгоритма');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlgorithm();
  }, [algorithmService]); // Добавляем algorithmService в зависимости

  const handleBack = (): void => {
    navigate(-1);
  };

  const updateData = (): void => {
    fetchAlgorithm();
  }

  return {
    algorithmData,
    isLoading,
    error,
    handleBack,
    updateData
  };
};
