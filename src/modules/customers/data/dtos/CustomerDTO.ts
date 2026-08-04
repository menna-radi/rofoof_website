export interface CustomerDTO {
  customer_id: string;
  full_name: string;
  account_type: 'Wholesale' | 'Retail';
  phone_number: string;
  delivery_address: string;
  orders_count: number;
  total_spent_val: string;
  last_order_timestamp: string;
  avatar_bg_class: string;
}
