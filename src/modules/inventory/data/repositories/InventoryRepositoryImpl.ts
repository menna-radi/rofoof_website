import { IInventoryRepository } from '../../domain/repositories/IInventoryRepository';
import { InventorySummaryEntity, StockItemEntity } from '../../domain/entities/InventoryEntity';
import { ENV } from '@/core/api/environment';
import { inventoryLocalDataSource } from '../datasources/InventoryLocalDataSource';
import { inventoryRemoteDataSource } from '../datasources/InventoryRemoteDataSource';
import { InventoryMapper } from '../mappers/InventoryMapper';

export class InventoryRepositoryImpl implements IInventoryRepository {
  async getSummary(): Promise<InventorySummaryEntity> {
    if (ENV.USE_MOCK) return inventoryLocalDataSource.getSummary();
    const dto = await inventoryRemoteDataSource.getSummary();
    return InventoryMapper.toSummaryEntity(dto);
  }

  async updateStock(id: string, newQty: number): Promise<StockItemEntity> {
    if (ENV.USE_MOCK) return inventoryLocalDataSource.updateStock(id, newQty);
    const dto = await inventoryRemoteDataSource.updateStock(id, newQty);
    return InventoryMapper.toStockItem(dto);
  }
}

export const inventoryRepository = new InventoryRepositoryImpl();
