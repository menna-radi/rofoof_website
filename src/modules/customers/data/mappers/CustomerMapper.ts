import { CustomerDTO } from '../dtos/CustomerDTO';
import { CustomerEntity } from '../../domain/entities/CustomerEntity';

export class CustomerMapper {
  static toEntity(dto: CustomerDTO): CustomerEntity {
    return {
      id: dto.customer_id,
      name: dto.full_name,
      type: dto.account_type,
      phone: dto.phone_number,
      address: dto.delivery_address,
      totalOrders: dto.orders_count,
      totalSpent: dto.total_spent_val,
      lastOrderDate: dto.last_order_timestamp,
      avatarBg: dto.avatar_bg_class,
    };
  }
}
