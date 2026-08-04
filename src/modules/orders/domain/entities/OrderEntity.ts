export type OrderStatus = 'active' | 'pending' | 'delivered' | 'cancelled';

export interface OrderItemEntity {
  id: string;
  name: string;
  qty: number;
  price: string;
  total: string;
}

export interface OrderTimelineStepEntity {
  label: string;
  time?: string;
  status: 'completed' | 'active' | 'pending';
}

export interface OrderEntity {
  id: string;
  orderNumber: string;
  customer: string;
  customerPhone?: string;
  customerAddress?: string;
  isWholesale?: boolean;
  amount: string;
  itemsCount: number;
  driverName?: string;
  driverPhone?: string;
  status: OrderStatus;
  progressPct?: number;
  time: string;
  items?: OrderItemEntity[];
  timeline?: OrderTimelineStepEntity[];
}
