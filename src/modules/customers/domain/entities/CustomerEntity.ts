export type CustomerType = 'Retail' | 'Wholesale';

export interface CustomerEntity {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: string;
  lastOrderDate: string;
  avatarBg: string;
}
