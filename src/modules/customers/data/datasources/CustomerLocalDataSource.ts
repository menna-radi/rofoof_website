import { CustomerDTO } from '../dtos/CustomerDTO';

export interface ICustomerLocalDataSource {
  getCachedCustomers(): CustomerDTO[];
  cacheCustomers(customers: CustomerDTO[]): void;
}

export class CustomerLocalDataSourceImpl implements ICustomerLocalDataSource {
  private cache: CustomerDTO[] = [];

  getCachedCustomers(): CustomerDTO[] {
    return this.cache;
  }

  cacheCustomers(customers: CustomerDTO[]): void {
    this.cache = customers;
  }
}

export const customerLocalDataSource = new CustomerLocalDataSourceImpl();
