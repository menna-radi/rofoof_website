import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { OrderEntity } from '../../domain/entities/OrderEntity';
import { ENV } from '@/core/api/environment';
import { ordersLocalDataSource } from '../datasources/OrdersLocalDataSource';
import { ordersRemoteDataSource } from '../datasources/OrdersRemoteDataSource';
import { OrderMapper } from '../mappers/OrderMapper';

export class OrderRepositoryImpl implements IOrderRepository {
  async getOrders(): Promise<OrderEntity[]> {
    if (ENV.USE_MOCK) {
      return ordersLocalDataSource.getOrders();
    }
    const dtos = await ordersRemoteDataSource.getOrders();
    return dtos.map(OrderMapper.toEntity);
  }

  async getOrderById(id: string): Promise<OrderEntity | null> {
    if (ENV.USE_MOCK) {
      return ordersLocalDataSource.getOrderById(id);
    }
    const dto = await ordersRemoteDataSource.getOrderById(id);
    return dto ? OrderMapper.toEntity(dto) : null;
  }

  async createOrder(order: Partial<OrderEntity>): Promise<OrderEntity> {
    if (ENV.USE_MOCK) {
      return ordersLocalDataSource.createOrder(order);
    }
    const dto = await ordersRemoteDataSource.createOrder(order as any);
    return OrderMapper.toEntity(dto);
  }

  async updateOrderStatus(id: string, status: OrderEntity['status']): Promise<OrderEntity> {
    if (ENV.USE_MOCK) {
      return ordersLocalDataSource.updateOrderStatus(id, status);
    }
    const dto = await ordersRemoteDataSource.updateStatus(id, status);
    return OrderMapper.toEntity(dto);
  }
}

export const orderRepository = new OrderRepositoryImpl();
