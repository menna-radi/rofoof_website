import { IDispatchRepository } from '../../domain/repositories/IDispatchRepository';
import { DispatchBoardEntity, DispatchOrderEntity } from '../../domain/entities/DispatchEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';

const MOCK_PENDING: DispatchOrderEntity[] = [
  { id: 'd1', orderNumber: '#8822', customer: 'Cairo Retail Chain', address: 'Heliopolis, Cairo', priority: 'high', status: 'queued', timeInQueue: '12 min' },
  { id: 'd2', orderNumber: '#8823', customer: 'Sarah Ahmed', address: 'Zamalek, Cairo', priority: 'normal', status: 'queued', timeInQueue: '5 min' },
  { id: 'd3', orderNumber: '#8824', customer: 'Nile Hypermarket', address: 'Maadi, Cairo', priority: 'high', status: 'queued', timeInQueue: '18 min' },
];

const MOCK_ASSIGNED: DispatchOrderEntity[] = [
  { id: 'd4', orderNumber: '#8821', customer: 'Metro Grocers Ltd', address: 'Downtown, Cairo', priority: 'normal', status: 'en_route', driverName: 'Ahmed Khalil', estimatedTime: '12 min' },
  { id: 'd5', orderNumber: '#8820', customer: 'Delta Supermarket', address: 'Nasr City, Cairo', priority: 'normal', status: 'en_route', driverName: 'Mohamed Hassan', estimatedTime: '28 min' },
];

export class DispatchRepositoryImpl implements IDispatchRepository {
  private pending = [...MOCK_PENDING];
  private assigned = [...MOCK_ASSIGNED];

  async getBoard(): Promise<DispatchBoardEntity> {
    if (ENV.USE_MOCK) {
      return Promise.resolve({
        pendingOrders: this.pending,
        assignedOrders: this.assigned,
        completedToday: 24,
        avgDispatchTime: '8.2 min',
      });
    }
    const res = await apiClient.get<DispatchBoardEntity>(ENDPOINTS.DISPATCH.BOARD);
    return res.data;
  }

  async assignDriver(orderId: string, driverId: string): Promise<DispatchOrderEntity> {
    if (ENV.USE_MOCK) {
      const order = this.pending.find((o) => o.id === orderId);
      if (!order) throw new Error('Order not found');
      const updated: DispatchOrderEntity = { ...order, status: 'assigned', driverName: `Driver ${driverId}` };
      this.pending = this.pending.filter((o) => o.id !== orderId);
      this.assigned = [...this.assigned, updated];
      return Promise.resolve(updated);
    }
    const res = await apiClient.post<DispatchOrderEntity>(ENDPOINTS.DISPATCH.ASSIGN, { orderId, driverId });
    return res.data;
  }
}

export const dispatchRepository = new DispatchRepositoryImpl();
