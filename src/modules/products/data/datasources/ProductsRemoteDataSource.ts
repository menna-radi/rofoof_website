import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/api/endpoints';
import { ProductDTO, ProductCategoryDTO } from '../dtos/ProductDTO';

export interface IProductsRemoteDataSource {
  getProducts(): Promise<ProductDTO[]>;
  getCategories(): Promise<ProductCategoryDTO[]>;
  createProduct(product: Partial<ProductDTO>): Promise<ProductDTO>;
  deleteProduct(id: string): Promise<boolean>;
}

export class ProductsRemoteDataSourceImpl implements IProductsRemoteDataSource {
  async getProducts(): Promise<ProductDTO[]> {
    const res = await apiClient.get<ProductDTO[]>(ENDPOINTS.PRODUCTS.LIST);
    return res.data;
  }

  async getCategories(): Promise<ProductCategoryDTO[]> {
    const res = await apiClient.get<ProductCategoryDTO[]>(ENDPOINTS.PRODUCTS.CATEGORIES);
    return res.data;
  }

  async createProduct(product: Partial<ProductDTO>): Promise<ProductDTO> {
    const res = await apiClient.post<ProductDTO>(ENDPOINTS.PRODUCTS.CREATE, product);
    return res.data;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const res = await apiClient.delete(ENDPOINTS.PRODUCTS.DELETE(id));
    return res.success;
  }
}

export const productsRemoteDataSource = new ProductsRemoteDataSourceImpl();
