import { useState, useEffect } from 'react';
import { getOrdersUseCase, updateOrderStatusUseCase } from '../../domain/usecases/OrdersUseCases';
import { OrderEntity, OrderStatus } from '../../domain/entities/OrderEntity';

export const useOrdersController = (initialTab: string = 'all') => {
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const filter = initialTab !== 'all' ? (initialTab as OrderStatus) : undefined;
    getOrdersUseCase
      .execute(filter)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [initialTab]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      const updated = await updateOrderStatusUseCase.execute(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { orders, isLoading, error, updateStatus };
};
