export interface ProductDTO {
  product_id: string;
  product_name: string;
  sku_number: string;
  category_title: string;
  price_egp: string;
  original_price?: string;
  stock_quantity: number;
  image_icon: string;
  publication_status: 'published' | 'draft' | 'on_offer';
  discount_percentage?: string;
  total_sales: number;
}

export interface ProductCategoryDTO {
  category_id: string;
  category_name: string;
  url_slug: string;
  description: string;
  product_count: number;
  is_active: boolean;
}
