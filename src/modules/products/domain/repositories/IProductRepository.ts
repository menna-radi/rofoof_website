import { ProductEntity, ProductCategoryEntity } from '../entities/ProductEntity';

export interface IProductRepository {
  getProducts(): Promise<ProductEntity[]>;
  getProductById(id: string): Promise<ProductEntity | null>;
  createProduct(product: Partial<ProductEntity>): Promise<ProductEntity>;
  deleteProduct(id: string): Promise<boolean>;
  getCategories(): Promise<ProductCategoryEntity[]>;
}
