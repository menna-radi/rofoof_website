import { ProductDTO } from '../dtos/ProductDTO';

export interface IProductsLocalDataSource {
  getCachedProducts(): ProductDTO[];
  cacheProducts(products: ProductDTO[]): void;
}

export class ProductsLocalDataSourceImpl implements IProductsLocalDataSource {
  private cache: ProductDTO[] = [];

  getCachedProducts(): ProductDTO[] {
    return this.cache;
  }

  cacheProducts(products: ProductDTO[]): void {
    this.cache = products;
  }
}

export const productsLocalDataSource = new ProductsLocalDataSourceImpl();
