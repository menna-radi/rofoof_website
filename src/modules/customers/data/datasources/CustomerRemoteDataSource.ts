import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { CustomerDTO } from '../dtos/CustomerDTO';

export interface ICustomerRemoteDataSource {
  getCustomers(): Promise<CustomerDTO[]>;
  getCustomerById(id: string): Promise<CustomerDTO>;
}

export class CustomerRemoteDataSourceImpl implements ICustomerRemoteDataSource {
  async getCustomers(): Promise<CustomerDTO[]> {
    const res = await apiClient.get<CustomerDTO[]>(ENDPOINTS.CUSTOMERS.LIST);
    return res.data;
  }

  async getCustomerById(id: string): Promise<CustomerDTO> {
    const res = await apiClient.get<CustomerDTO>(ENDPOINTS.CUSTOMERS.DETAIL(id));
    return res.data;
  }
}

export const customerRemoteDataSource = new CustomerRemoteDataSourceImpl();
