import { CustomerEntity } from '../../domain/entities/CustomerEntity';

const MOCK_CUSTOMERS: CustomerEntity[] = [
  { id: '1', name: 'Metro Grocers Ltd', type: 'Wholesale', phone: '+20 100 123 4567', address: '14 Nile St., Downtown, Cairo', totalOrders: 148, totalSpent: '$45,200', lastOrderDate: 'Today, 09:14 AM', avatarBg: 'bg-[#384E85]' },
  { id: '2', name: 'Cairo Retail Chain', type: 'Wholesale', phone: '+20 111 222 3333', address: 'Heliopolis, Cairo', totalOrders: 92, totalSpent: '$28,400', lastOrderDate: 'Yesterday', avatarBg: 'bg-[#10B981]' },
  { id: '3', name: 'Nile Hypermarket', type: 'Wholesale', phone: '+20 122 333 4444', address: 'Maadi, Cairo', totalOrders: 210, totalSpent: '$84,000', lastOrderDate: 'Today, 08:12 AM', avatarBg: 'bg-[#F59E0B]' },
  { id: '4', name: 'Sarah Ahmed', type: 'Retail', phone: '+20 100 999 8888', address: 'Zamalek, Cairo', totalOrders: 14, totalSpent: '$680', lastOrderDate: 'Today, 08:45 AM', avatarBg: 'bg-[#8B5CF6]' },
];

export interface ICustomerLocalDataSource {
  getCustomers(): Promise<CustomerEntity[]>;
  getCustomerById(id: string): Promise<CustomerEntity | null>;
}

export class CustomerLocalDataSourceImpl implements ICustomerLocalDataSource {
  private customers = [...MOCK_CUSTOMERS];

  async getCustomers(): Promise<CustomerEntity[]> {
    return Promise.resolve(this.customers);
  }

  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    return Promise.resolve(this.customers.find((c) => c.id === id) || null);
  }
}

export const customerLocalDataSource = new CustomerLocalDataSourceImpl();
