import { InventorySummaryDTO, StockItemDTO } from '../dtos/InventoryDTO';
import { InventorySummaryEntity, StockItemEntity } from '../../domain/entities/InventoryEntity';

export class InventoryMapper {
  static toStockItem(dto: StockItemDTO): StockItemEntity {
    return {
      id: dto.item_id,
      name: dto.item_name,
      sku: dto.sku_code,
      category: dto.category_name,
      stock: dto.current_stock,
      threshold: dto.alert_threshold,
      status: dto.health_status,
      unit: dto.unit_of_measure,
      lastRestocked: dto.last_restock_date,
      image: dto.icon_symbol,
    };
  }

  static toSummaryEntity(dto: InventorySummaryDTO): InventorySummaryEntity {
    return {
      totalProducts: dto.total_products_count,
      totalValue: dto.total_inventory_value,
      lowStockCount: dto.low_stock_items_count,
      outOfStockCount: dto.out_of_stock_items_count,
      items: dto.stock_items.map(InventoryMapper.toStockItem),
    };
  }
}
