import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { OrderEntity } from '../../domain/entities/OrderEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';

const MOCK_ORDERS: OrderEntity[] = [
  {
    id: '8821',
    orderNumber: '#8821',
    customer: 'Metro Grocers Ltd',
    customerPhone: '+20 100 123 4567',
    customerAddress: '14 Nile St., Downtown, Cairo',
    isWholesale: true,
    amount: '1240 EGP',
    itemsCount: 48,
    driverName: 'Ahmed Khalil',
    driverPhone: '+20 100 234 5678',
    status: 'active',
    progressPct: 83,
    time: '09:14',
    items: [
      { id: '1', name: 'Fresh Organic Bananas (24 kg)', qty: 24, price: '25 EGP', total: '600 EGP' },
      { id: '2', name: 'Whole Milk 2L (16 bottles)', qty: 16, price: '20 EGP', total: '320 EGP' },
      { id: '3', name: 'Fresh Chicken Breast 1kg (8 packs)', qty: 8, price: '40 EGP', total: '320 EGP' }
    ],
    timeline: [
      { label: 'Order Placed', time: '09:14 AM', status: 'completed' },
      { label: 'Confirmed', time: '09:16 AM', status: 'completed' },
      { label: 'Preparing', time: '09:20 AM', status: 'completed' },
      { label: 'Ready for Pickup', time: '09:35 AM', status: 'completed' },
      { label: 'Picked Up', time: '09:42 AM', status: 'completed' },
      { label: 'On The Way', time: '09:50 AM', status: 'active' },
      { label: 'Delivered', status: 'pending' }
    ]
  },
  {
    id: '8820',
    orderNumber: '#8820',
    customer: 'Sarah Ahmed',
    customerPhone: '+20 100 999 8888',
    customerAddress: 'Zamalek, Cairo',
    isWholesale: false,
    amount: '680 EGP',
    itemsCount: 12,
    driverName: 'Mohamed Hassan',
    driverPhone: '+20 111 345 6789',
    status: 'delivered',
    progressPct: 100,
    time: '08:45',
  },
  {
    id: '8819',
    orderNumber: '#8819',
    customer: 'Nile Hypermarket',
    customerPhone: '+20 122 333 4444',
    customerAddress: 'Maadi, Cairo',
    isWholesale: true,
    amount: '2450 EGP',
    itemsCount: 95,
    driverName: 'Tarek Mahmoud',
    driverPhone: '+20 122 456 7890',
    status: 'active',
    progressPct: 35,
    time: '08:12',
  },
  {
    id: '8818',
    orderNumber: '#8818',
    customer: 'Delta Supermarket',
    customerPhone: '+20 100 555 6666',
    customerAddress: 'Nasr City, Cairo',
    isWholesale: true,
    amount: '310 EGP',
    itemsCount: 8,
    status: 'cancelled',
    time: '07:50',
  }
];

export class OrderRepositoryImpl implements IOrderRepository {
  private orders: OrderEntity[] = [...MOCK_ORDERS];

  async getOrders(): Promise<OrderEntity[]> {
    if (ENV.USE_MOCK) {
      return Promise.resolve(this.orders);
    }
    const res = await apiClient.get<OrderEntity[]>(ENDPOINTS.ORDERS.LIST);
    return res.data;
  }

  async getOrderById(id: string): Promise<OrderEntity | null> {
    if (ENV.USE_MOCK) {
      return Promise.resolve(this.orders.find((o) => o.id === id) || null);
    }
    const res = await apiClient.get<OrderEntity>(ENDPOINTS.ORDERS.DETAIL(id));
    return res.data;
  }

  async createOrder(order: Partial<OrderEntity>): Promise<OrderEntity> {
    if (ENV.USE_MOCK) {
      const newOrder: OrderEntity = {
        id: String(Date.now()),
        orderNumber: `#${Math.floor(8800 + Math.random() * 100)}`,
        customer: order.customer || 'New Customer',
        amount: order.amount || '0 EGP',
        itemsCount: order.itemsCount || 1,
        status: 'active',
        time: 'Just now',
        ...order,
      };
      this.orders = [newOrder, ...this.orders];
      return Promise.resolve(newOrder);
    }
    const res = await apiClient.post<OrderEntity>(ENDPOINTS.ORDERS.CREATE, order);
    return res.data;
  }

  async updateOrderStatus(id: string, status: OrderEntity['status']): Promise<OrderEntity> {
    if (ENV.USE_MOCK) {
      this.orders = this.orders.map((o) => (o.id === id ? { ...o, status } : o));
      const updated = this.orders.find((o) => o.id === id)!;
      return Promise.resolve(updated);
    }
    const res = await apiClient.put<OrderEntity>(ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
    return res.data;
  }
}

export const orderRepository = new OrderRepositoryImpl();
