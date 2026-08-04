import { useState, useEffect } from 'react';
import { getDriversUseCase, createDriverUseCase, deleteDriverUseCase } from '../../domain/usecases/DriversUseCases';
import { DriverEntity } from '../../domain/entities/DriverEntity';

export const useDriversController = () => {
  const [drivers, setDrivers] = useState<DriverEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDriversUseCase
      .execute()
      .then(setDrivers)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const addDriver = async (driver: Partial<DriverEntity>) => {
    try {
      const created = await createDriverUseCase.execute(driver);
      setDrivers((prev) => [created, ...prev]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeDriver = async (id: string) => {
    try {
      await deleteDriverUseCase.execute(id);
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { drivers, isLoading, error, addDriver, removeDriver };
};
