import { DispatchBoardEntity, DispatchOrderEntity } from '../../domain/entities/DispatchEntity';

const MOCK_PENDING: DispatchOrderEntity[] = [
  { id: 'd1', orderNumber: '#8822', customer: 'Cairo Retail Chain', address: 'Heliopolis, Cairo', priority: 'high', status: 'queued', timeInQueue: '12 min' },
  { id: 'd2', orderNumber: '#8823', customer: 'Sarah Ahmed', address: 'Zamalek, Cairo', priority: 'normal', status: 'queued', timeInQueue: '5 min' },
  { id: 'd3', orderNumber: '#8824', customer: 'Nile Hypermarket', address: 'Maadi, Cairo', priority: 'high', status: 'queued', timeInQueue: '18 min' },
];

const MOCK_ASSIGNED: DispatchOrderEntity[] = [
  { id: 'd4', orderNumber: '#8821', customer: 'Metro Grocers Ltd', address: 'Downtown, Cairo', priority: 'normal', status: 'en_route', driverName: 'Ahmed Khalil', estimatedTime: '12 min' },
  { id: 'd5', orderNumber: '#8820', customer: 'Delta Supermarket', address: 'Nasr City, Cairo', priority: 'normal', status: 'en_route', driverName: 'Mohamed Hassan', estimatedTime: '28 min' },
];

export interface IDispatchLocalDataSource {
  getBoard(): Promise<DispatchBoardEntity>;
  assignDriver(orderId: string, driverId: string): Promise<DispatchOrderEntity>;
}

export class DispatchLocalDataSourceImpl implements IDispatchLocalDataSource {
  private pending = [...MOCK_PENDING];
  private assigned = [...MOCK_ASSIGNED];

  async getBoard(): Promise<DispatchBoardEntity> {
    return Promise.resolve({
      pendingOrders: this.pending,
      assignedOrders: this.assigned,
      completedToday: 24,
      avgDispatchTime: '8.2 min',
    });
  }

  async assignDriver(orderId: string, driverId: string): Promise<DispatchOrderEntity> {
    const order = this.pending.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');
    const updated: DispatchOrderEntity = { ...order, status: 'assigned', driverName: `Driver ${driverId}` };
    this.pending = this.pending.filter((o) => o.id !== orderId);
    this.assigned = [...this.assigned, updated];
    return Promise.resolve(updated);
  }
}

export const dispatchLocalDataSource = new DispatchLocalDataSourceImpl();
