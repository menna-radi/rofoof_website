import { CustomerEntity } from '../entities/CustomerEntity';

export interface ICustomerRepository {
  getCustomers(): Promise<CustomerEntity[]>;
  getCustomerById(id: string): Promise<CustomerEntity | null>;
}
