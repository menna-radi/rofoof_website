export type ProductStatus = 'published' | 'unpublished' | 'draft' | 'on_offer';

export interface ProductEntity {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  oldPrice?: string;
  stock: number;
  image: string;
  status: ProductStatus;
  salesCount?: number;
  discountPct?: string;
}

export interface ProductCategoryEntity {
  id: string;
  name: string;
  slug: string;
  desc: string;
  productCount: number;
  active: boolean;
}
