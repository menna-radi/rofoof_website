import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { InventorySummaryDTO, StockItemDTO } from '../dtos/InventoryDTO';

export interface IInventoryRemoteDataSource {
  getSummary(): Promise<InventorySummaryDTO>;
  updateStock(id: string, stock: number): Promise<StockItemDTO>;
}

export class InventoryRemoteDataSourceImpl implements IInventoryRemoteDataSource {
  async getSummary(): Promise<InventorySummaryDTO> {
    const res = await apiClient.get<InventorySummaryDTO>(ENDPOINTS.INVENTORY.OVERVIEW);
    return res.data;
  }

  async updateStock(id: string, stock: number): Promise<StockItemDTO> {
    const res = await apiClient.put<StockItemDTO>(ENDPOINTS.INVENTORY.UPDATE_STOCK(id), { stock });
    return res.data;
  }
}

export const inventoryRemoteDataSource = new InventoryRemoteDataSourceImpl();
