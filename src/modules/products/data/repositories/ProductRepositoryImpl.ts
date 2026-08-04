import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductEntity, ProductCategoryEntity } from '../../domain/entities/ProductEntity';
import { ENV } from '@/core/api/environment';
import { productsLocalDataSource } from '../datasources/ProductsLocalDataSource';
import { productsRemoteDataSource } from '../datasources/ProductsRemoteDataSource';
import { ProductMapper } from '../mappers/ProductMapper';

export class ProductRepositoryImpl implements IProductRepository {
  async getProducts(): Promise<ProductEntity[]> {
    if (ENV.USE_MOCK) return productsLocalDataSource.getProducts();
    const dtos = await productsRemoteDataSource.getProducts();
    return dtos.map(ProductMapper.toProductEntity);
  }

  async getProductById(id: string): Promise<ProductEntity | null> {
    if (ENV.USE_MOCK) return productsLocalDataSource.getProductById(id);
    const dto = await productsRemoteDataSource.getProducts().then(list => list.find(p => p.product_id === id));
    return dto ? ProductMapper.toProductEntity(dto) : null;
  }

  async createProduct(product: Partial<ProductEntity>): Promise<ProductEntity> {
    if (ENV.USE_MOCK) return productsLocalDataSource.createProduct(product);
    const dto = await productsRemoteDataSource.createProduct(product as any);
    return ProductMapper.toProductEntity(dto);
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (ENV.USE_MOCK) return productsLocalDataSource.deleteProduct(id);
    return productsRemoteDataSource.deleteProduct(id);
  }

  async getCategories(): Promise<ProductCategoryEntity[]> {
    if (ENV.USE_MOCK) return productsLocalDataSource.getCategories();
    const dtos = await productsRemoteDataSource.getCategories();
    return dtos.map(ProductMapper.toCategoryEntity);
  }
}

export const productRepository = new ProductRepositoryImpl();
