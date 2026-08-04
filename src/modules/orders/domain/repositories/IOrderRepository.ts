import { OrderEntity } from '../entities/OrderEntity';

export interface IOrderRepository {
  getOrders(): Promise<OrderEntity[]>;
  getOrderById(id: string): Promise<OrderEntity | null>;
  createOrder(order: Partial<OrderEntity>): Promise<OrderEntity>;
  updateOrderStatus(id: string, status: OrderEntity['status']): Promise<OrderEntity>;
}
