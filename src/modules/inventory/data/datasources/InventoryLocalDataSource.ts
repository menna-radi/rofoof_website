import { InventorySummaryDTO } from '../dtos/InventoryDTO';

export interface IInventoryLocalDataSource {
  getCachedSummary(): InventorySummaryDTO | null;
  cacheSummary(data: InventorySummaryDTO): void;
}

export class InventoryLocalDataSourceImpl implements IInventoryLocalDataSource {
  private cache: InventorySummaryDTO | null = null;

  getCachedSummary(): InventorySummaryDTO | null {
    return this.cache;
  }

  cacheSummary(data: InventorySummaryDTO): void {
    this.cache = data;
  }
}

export const inventoryLocalDataSource = new InventoryLocalDataSourceImpl();
