import { useState, useEffect } from 'react';
import { getInventorySummaryUseCase, updateStockUseCase } from '../../domain/usecases/InventoryUseCases';
import { InventorySummaryEntity } from '../../domain/entities/InventoryEntity';

export const useInventoryController = () => {
  const [summary, setSummary] = useState<InventorySummaryEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInventorySummaryUseCase
      .execute()
      .then(setSummary)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const updateStock = async (id: string, newQty: number) => {
    try {
      const updated = await updateStockUseCase.execute(id, newQty);
      setSummary((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.map((i) => (i.id === id ? updated : i)),
            }
          : null
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { summary, isLoading, error, updateStock };
};
