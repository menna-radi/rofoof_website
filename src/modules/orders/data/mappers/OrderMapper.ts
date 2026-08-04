import { OrderDTO, OrderItemDTO } from '../dtos/OrderDTO';
import { OrderEntity, OrderItemEntity } from '../../domain/entities/OrderEntity';

/**
 * OrderMapper — Converts API DTOs → Domain Entities.
 * Ensures DTOs never leak into the UI layer.
 */
export class OrderMapper {
  static toItemEntity(dto: OrderItemDTO): OrderItemEntity {
    return {
      id: dto.item_id,
      name: dto.item_name,
      qty: dto.quantity,
      price: dto.unit_price,
      total: dto.line_total,
    };
  }

  static toEntity(dto: OrderDTO): OrderEntity {
    return {
      id: dto.order_id,
      orderNumber: dto.order_ref,
      customer: dto.customer_name,
      customerPhone: dto.customer_phone,
      customerAddress: dto.customer_address,
      isWholesale: dto.is_wholesale ?? false,
      amount: dto.total_amount,
      itemsCount: dto.items_count,
      driverName: dto.driver_name,
      driverPhone: dto.driver_phone,
      status: dto.status as OrderEntity['status'],
      progressPct: dto.progress_pct,
      time: dto.created_at,
      items: dto.items ? dto.items.map(OrderMapper.toItemEntity) : undefined,
    };
  }

  static toEntityList(dtos: OrderDTO[]): OrderEntity[] {
    return dtos.map(OrderMapper.toEntity);
  }
}
