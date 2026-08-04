import { inventoryRepository } from '../../data/repositories/InventoryRepositoryImpl';
import { InventorySummaryEntity, StockItemEntity } from '../entities/InventoryEntity';

/** GetInventorySummaryUseCase — retrieves full inventory summary */
export class GetInventorySummaryUseCase {
  async execute(): Promise<InventorySummaryEntity> {
    return inventoryRepository.getSummary();
  }
}

/** UpdateStockUseCase — updates the stock quantity for a single item */
export class UpdateStockUseCase {
  async execute(id: string, newQty: number): Promise<StockItemEntity> {
    if (newQty < 0) throw new Error('Quantity cannot be negative');
    return inventoryRepository.updateStock(id, newQty);
  }
}

export const getInventorySummaryUseCase = new GetInventorySummaryUseCase();
export const updateStockUseCase = new UpdateStockUseCase();
