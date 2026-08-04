import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { CustomerEntity } from '../../domain/entities/CustomerEntity';
import { ENV } from '@/core/api/environment';
import { customerLocalDataSource } from '../datasources/CustomerLocalDataSource';
import { customerRemoteDataSource } from '../datasources/CustomerRemoteDataSource';
import { CustomerMapper } from '../mappers/CustomerMapper';

export class CustomerRepositoryImpl implements ICustomerRepository {
  async getCustomers(): Promise<CustomerEntity[]> {
    if (ENV.USE_MOCK) return customerLocalDataSource.getCustomers();
    const dtos = await customerRemoteDataSource.getCustomers();
    return dtos.map(CustomerMapper.toEntity);
  }

  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    if (ENV.USE_MOCK) return customerLocalDataSource.getCustomerById(id);
    const dto = await customerRemoteDataSource.getCustomerById(id);
    return dto ? CustomerMapper.toEntity(dto) : null;
  }
}

export const customerRepository = new CustomerRepositoryImpl();
