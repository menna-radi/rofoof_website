import { InventorySummaryEntity, StockItemEntity } from '../entities/InventoryEntity';

export interface IInventoryRepository {
  getSummary(): Promise<InventorySummaryEntity>;
  updateStock(id: string, newQty: number): Promise<StockItemEntity>;
}
