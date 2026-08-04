export interface StockItemEntity {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  threshold: number;
  status: 'healthy' | 'low' | 'out';
  unit: string;
  lastRestocked: string;
  image: string;
}

export interface InventorySummaryEntity {
  totalProducts: number;
  totalValue: string;
  lowStockCount: number;
  outOfStockCount: number;
  items: StockItemEntity[];
}
