import { useState, useEffect } from 'react';
import { getDispatchBoardUseCase, assignDriverToOrderUseCase } from '../../domain/usecases/DispatchUseCases';
import { DispatchBoardEntity } from '../../domain/entities/DispatchEntity';

export const useDispatchController = () => {
  const [board, setBoard] = useState<DispatchBoardEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDispatchBoardUseCase
      .execute()
      .then(setBoard)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const assignDriver = async (orderId: string, driverId: string) => {
    try {
      await assignDriverToOrderUseCase.execute(orderId, driverId);
      // Refresh board state
      const updated = await getDispatchBoardUseCase.execute();
      setBoard(updated);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { board, isLoading, error, assignDriver };
};
