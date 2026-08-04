export interface DispatchOrderEntity {
  id: string;
  orderNumber: string;
  customer: string;
  address: string;
  priority: 'high' | 'normal' | 'low';
  status: 'queued' | 'assigned' | 'en_route' | 'delivered';
  driverName?: string;
  estimatedTime?: string;
  timeInQueue?: string;
}

export interface DispatchBoardEntity {
  pendingOrders: DispatchOrderEntity[];
  assignedOrders: DispatchOrderEntity[];
  completedToday: number;
  avgDispatchTime: string;
}
