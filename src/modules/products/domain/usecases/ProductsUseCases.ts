import { productRepository } from '../../data/repositories/ProductRepositoryImpl';
import { ProductEntity } from '../entities/ProductEntity';

/** GetProductsUseCase — retrieves all products */
export class GetProductsUseCase {
  async execute(): Promise<ProductEntity[]> {
    return productRepository.getProducts();
  }
}

/** GetCategoriesUseCase — retrieves all product categories */
export class GetCategoriesUseCase {
  async execute() {
    return productRepository.getCategories();
  }
}

/** CreateProductUseCase — creates a new product */
export class CreateProductUseCase {
  async execute(product: Partial<ProductEntity>): Promise<ProductEntity> {
    return productRepository.createProduct(product);
  }
}

/** DeleteProductUseCase — removes a product */
export class DeleteProductUseCase {
  async execute(id: string): Promise<boolean> {
    return productRepository.deleteProduct(id);
  }
}

export const getProductsUseCase = new GetProductsUseCase();
export const getCategoriesUseCase = new GetCategoriesUseCase();
export const createProductUseCase = new CreateProductUseCase();
export const deleteProductUseCase = new DeleteProductUseCase();
