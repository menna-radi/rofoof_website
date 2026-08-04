import { useState, useEffect } from 'react';
import { getCustomersUseCase } from '../../domain/usecases/CustomersUseCases';
import { CustomerEntity } from '../../domain/entities/CustomerEntity';

export const useCustomersController = () => {
  const [customers, setCustomers] = useState<CustomerEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCustomersUseCase
      .execute()
      .then(setCustomers)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { customers, isLoading, error };
};
