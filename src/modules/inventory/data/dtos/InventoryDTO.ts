export interface StockItemDTO {
  item_id: string;
  item_name: string;
  sku_code: string;
  category_name: string;
  current_stock: number;
  alert_threshold: number;
  health_status: 'healthy' | 'low' | 'out';
  unit_of_measure: string;
  last_restock_date: string;
  icon_symbol: string;
}

export interface InventorySummaryDTO {
  total_products_count: number;
  total_inventory_value: string;
  low_stock_items_count: number;
  out_of_stock_items_count: number;
  stock_items: StockItemDTO[];
}
