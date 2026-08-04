import { customerRepository } from '../../data/repositories/CustomerRepositoryImpl';
import { CustomerEntity } from '../entities/CustomerEntity';

/** GetCustomersUseCase — retrieves all customers */
export class GetCustomersUseCase {
  async execute(): Promise<CustomerEntity[]> {
    return customerRepository.getCustomers();
  }
}

/** GetCustomerDetailUseCase — retrieves a single customer by ID */
export class GetCustomerDetailUseCase {
  async execute(id: string): Promise<CustomerEntity | null> {
    return customerRepository.getCustomerById(id);
  }
}

export const getCustomersUseCase = new GetCustomersUseCase();
export const getCustomerDetailUseCase = new GetCustomerDetailUseCase();
