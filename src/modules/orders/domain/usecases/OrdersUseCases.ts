import { orderRepository } from '../../data/repositories/OrderRepositoryImpl';
import { OrderEntity, OrderStatus } from '../entities/OrderEntity';

/** GetOrdersUseCase — retrieves all orders with optional status filter */
export class GetOrdersUseCase {
  async execute(filter?: OrderStatus): Promise<OrderEntity[]> {
    const orders = await orderRepository.getOrders();
    if (!filter) return orders;
    return orders.filter((o) => o.status === filter);
  }
}

/** GetOrderDetailUseCase — retrieves a single order by ID */
export class GetOrderDetailUseCase {
  async execute(id: string): Promise<OrderEntity | null> {
    return orderRepository.getOrderById(id);
  }
}

/** UpdateOrderStatusUseCase — transitions an order to a new status */
export class UpdateOrderStatusUseCase {
  async execute(id: string, status: OrderStatus): Promise<OrderEntity> {
    return orderRepository.updateOrderStatus(id, status);
  }
}

/** CreateOrderUseCase — creates a new order */
export class CreateOrderUseCase {
  async execute(order: Partial<OrderEntity>): Promise<OrderEntity> {
    return orderRepository.createOrder(order);
  }
}

export const getOrdersUseCase = new GetOrdersUseCase();
export const getOrderDetailUseCase = new GetOrderDetailUseCase();
export const updateOrderStatusUseCase = new UpdateOrderStatusUseCase();
export const createOrderUseCase = new CreateOrderUseCase();
