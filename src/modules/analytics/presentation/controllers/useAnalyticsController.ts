import { useState, useEffect } from 'react';
import { getAnalyticsSummaryUseCase } from '../../domain/usecases/GetAnalyticsSummaryUseCase';
import { AnalyticsSummaryEntity } from '../../domain/entities/AnalyticsEntity';

export const useAnalyticsController = (period: string = '7d') => {
  const [summary, setSummary] = useState<AnalyticsSummaryEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAnalyticsSummaryUseCase
      .execute(period)
      .then(setSummary)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [period]);

  return { summary, isLoading, error };
};
