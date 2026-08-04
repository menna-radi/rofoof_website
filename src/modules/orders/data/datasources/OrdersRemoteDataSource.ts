import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { OrderDTO } from '../dtos/OrderDTO';

export interface IOrdersRemoteDataSource {
  getOrders(): Promise<OrderDTO[]>;
  getOrderById(id: string): Promise<OrderDTO>;
  createOrder(order: Partial<OrderDTO>): Promise<OrderDTO>;
  updateStatus(id: string, status: string): Promise<OrderDTO>;
}

export class OrdersRemoteDataSourceImpl implements IOrdersRemoteDataSource {
  async getOrders(): Promise<OrderDTO[]> {
    const res = await apiClient.get<OrderDTO[]>(ENDPOINTS.ORDERS.LIST);
    return res.data;
  }

  async getOrderById(id: string): Promise<OrderDTO> {
    const res = await apiClient.get<OrderDTO>(ENDPOINTS.ORDERS.DETAIL(id));
    return res.data;
  }

  async createOrder(order: Partial<OrderDTO>): Promise<OrderDTO> {
    const res = await apiClient.post<OrderDTO>(ENDPOINTS.ORDERS.CREATE, order);
    return res.data;
  }

  async updateStatus(id: string, status: string): Promise<OrderDTO> {
    const res = await apiClient.put<OrderDTO>(ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
    return res.data;
  }
}

export const ordersRemoteDataSource = new OrdersRemoteDataSourceImpl();
