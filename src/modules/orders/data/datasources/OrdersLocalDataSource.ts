import { OrderDTO } from '../dtos/OrderDTO';

export interface IOrdersLocalDataSource {
  getCachedOrders(): OrderDTO[];
  cacheOrders(orders: OrderDTO[]): void;
}

export class OrdersLocalDataSourceImpl implements IOrdersLocalDataSource {
  private cache: OrderDTO[] = [];

  getCachedOrders(): OrderDTO[] {
    return this.cache;
  }

  cacheOrders(orders: OrderDTO[]): void {
    this.cache = orders;
  }
}

export const ordersLocalDataSource = new OrdersLocalDataSourceImpl();
