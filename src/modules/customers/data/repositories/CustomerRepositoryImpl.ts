import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { CustomerEntity } from '../../domain/entities/CustomerEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';

const MOCK_CUSTOMERS: CustomerEntity[] = [
  { id: '1', name: 'Metro Grocers Ltd', type: 'Wholesale', phone: '+20 100 123 4567', address: '14 Nile St., Downtown, Cairo', totalOrders: 148, totalSpent: '$45,200', lastOrderDate: 'Today, 09:14 AM', avatarBg: 'bg-[#384E85]' },
  { id: '2', name: 'Cairo Retail Chain', type: 'Wholesale', phone: '+20 111 222 3333', address: 'Heliopolis, Cairo', totalOrders: 92, totalSpent: '$28,400', lastOrderDate: 'Yesterday', avatarBg: 'bg-[#10B981]' },
  { id: '3', name: 'Nile Hypermarket', type: 'Wholesale', phone: '+20 122 333 4444', address: 'Maadi, Cairo', totalOrders: 210, totalSpent: '$84,000', lastOrderDate: 'Today, 08:12 AM', avatarBg: 'bg-[#F59E0B]' },
  { id: '4', name: 'Sarah Ahmed', type: 'Retail', phone: '+20 100 999 8888', address: 'Zamalek, Cairo', totalOrders: 14, totalSpent: '$680', lastOrderDate: 'Today, 08:45 AM', avatarBg: 'bg-[#8B5CF6]' },
];

export class CustomerRepositoryImpl implements ICustomerRepository {
  private customers = [...MOCK_CUSTOMERS];

  async getCustomers(): Promise<CustomerEntity[]> {
    if (ENV.USE_MOCK) return Promise.resolve(this.customers);
    const res = await apiClient.get<CustomerEntity[]>(ENDPOINTS.CUSTOMERS.LIST);
    return res.data;
  }

  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    if (ENV.USE_MOCK) return Promise.resolve(this.customers.find((c) => c.id === id) || null);
    const res = await apiClient.get<CustomerEntity>(ENDPOINTS.CUSTOMERS.DETAIL(id));
    return res.data;
  }
}

export const customerRepository = new CustomerRepositoryImpl();
