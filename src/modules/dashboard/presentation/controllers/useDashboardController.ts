import { useState, useEffect } from 'react';
import { getDashboardSummaryUseCase } from '../../domain/usecases/GetDashboardSummaryUseCase';
import { DashboardSummaryEntity } from '../../domain/entities/DashboardEntity';

export const useDashboardController = () => {
  const [data, setData] = useState<DashboardSummaryEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardSummaryUseCase
      .execute()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};
