import { IInventoryRepository } from '../../domain/repositories/IInventoryRepository';
import { InventorySummaryEntity, StockItemEntity } from '../../domain/entities/InventoryEntity';
import { ENV } from '@/core/api/environment';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';

const MOCK_ITEMS: StockItemEntity[] = [
  { id: '1', name: 'Fresh Organic Bananas', sku: 'FRU-001', category: 'Produce', stock: 8, threshold: 20, status: 'low', unit: 'kg', lastRestocked: '2 days ago', image: '🍌' },
  { id: '2', name: 'Whole Milk 2L', sku: 'DAI-034', category: 'Dairy', stock: 12, threshold: 30, status: 'low', unit: 'bottles', lastRestocked: '1 day ago', image: '🥛' },
  { id: '3', name: 'Fresh Chicken Breast 1kg', sku: 'MEA-012', category: 'Meat', stock: 4, threshold: 15, status: 'low', unit: 'packs', lastRestocked: '3 days ago', image: '🍗' },
  { id: '4', name: 'Pure Honey 500g', sku: 'HON-005', category: 'Pantry', stock: 45, threshold: 10, status: 'healthy', unit: 'jars', lastRestocked: '1 week ago', image: '🍯' },
  { id: '5', name: 'Greek Yogurt 1kg', sku: 'DAI-078', category: 'Dairy', stock: 0, threshold: 20, status: 'out', unit: 'containers', lastRestocked: '5 days ago', image: '🥛' },
  { id: '6', name: 'Red Gala Apples 1kg', sku: 'FRU-008', category: 'Produce', stock: 50, threshold: 25, status: 'healthy', unit: 'kg', lastRestocked: 'Today', image: '🍎' },
];

export class InventoryRepositoryImpl implements IInventoryRepository {
  private items = [...MOCK_ITEMS];

  async getSummary(): Promise<InventorySummaryEntity> {
    if (ENV.USE_MOCK) {
      return Promise.resolve({
        totalProducts: 489,
        totalValue: '$14.2M',
        lowStockCount: this.items.filter((i) => i.status === 'low').length,
        outOfStockCount: this.items.filter((i) => i.status === 'out').length,
        items: this.items,
      });
    }
    const res = await apiClient.get<InventorySummaryEntity>(ENDPOINTS.INVENTORY.OVERVIEW);
    return res.data;
  }

  async updateStock(id: string, newQty: number): Promise<StockItemEntity> {
    if (ENV.USE_MOCK) {
      this.items = this.items.map((item) => {
        if (item.id !== id) return item;
        const status: StockItemEntity['status'] =
          newQty === 0 ? 'out' : newQty < item.threshold ? 'low' : 'healthy';
        return { ...item, stock: newQty, status };
      });
      return Promise.resolve(this.items.find((i) => i.id === id)!);
    }
    const res = await apiClient.put<StockItemEntity>(ENDPOINTS.INVENTORY.UPDATE_STOCK(id), { stock: newQty });
    return res.data;
  }
}

export const inventoryRepository = new InventoryRepositoryImpl();
