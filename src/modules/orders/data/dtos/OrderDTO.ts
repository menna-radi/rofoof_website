/**
 * Data Transfer Objects (DTOs) — Raw API response shapes.
 * These NEVER reach the UI. They are converted by OrderMapper.
 */
export interface OrderItemDTO {
  item_id: string;
  item_name: string;
  quantity: number;
  unit_price: string;
  line_total: string;
}

export interface OrderDTO {
  order_id: string;
  order_ref: string;
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  is_wholesale?: boolean;
  total_amount: string;
  items_count: number;
  driver_name?: string;
  driver_phone?: string;
  status: string;
  progress_pct?: number;
  created_at: string;
  items?: OrderItemDTO[];
}
