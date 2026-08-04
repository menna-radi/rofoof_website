import { ProductEntity, ProductCategoryEntity } from '../../domain/entities/ProductEntity';

const MOCK_PRODUCTS: ProductEntity[] = [
  { id: '1', name: 'Fresh Organic Bananas', sku: 'FRU-001', category: 'Produce', price: '25 EGP', oldPrice: '30 EGP', stock: 8, image: '🍌', status: 'published', salesCount: 1420 },
  { id: '2', name: 'Whole Milk 2L', sku: 'DAI-034', category: 'Dairy', price: '20 EGP', stock: 12, image: '🥛', status: 'published', salesCount: 980 },
  { id: '3', name: 'Fresh Chicken Breast 1kg', sku: 'MEA-012', category: 'Meat & Poultry', price: '40 EGP', stock: 4, image: '🍗', status: 'published', salesCount: 640 },
  { id: '4', name: 'Pure Egyptian Honey 500g', sku: 'HON-005', category: 'Pantry', price: '85 EGP', oldPrice: '100 EGP', stock: 45, image: '🍯', status: 'on_offer', discountPct: '15%', salesCount: 510 },
  { id: '5', name: 'Fresh Orange Juice 1L', sku: 'BEV-089', category: 'Beverages', price: '32 EGP', stock: 30, image: '🍊', status: 'published', salesCount: 1150 },
  { id: '6', name: 'Red Gala Apples 1kg', sku: 'FRU-008', category: 'Produce', price: '35 EGP', stock: 50, image: '🍎', status: 'published', salesCount: 890 },
];

const MOCK_CATEGORIES: ProductCategoryEntity[] = [
  { id: 'c1', name: 'Produce', slug: 'produce', desc: 'Fresh fruits and vegetables', productCount: 142, active: true },
  { id: 'c2', name: 'Dairy & Eggs', slug: 'dairy-eggs', desc: 'Milk, cheese, yogurt & eggs', productCount: 98, active: true },
  { id: 'c3', name: 'Meat & Poultry', slug: 'meat-poultry', desc: 'Fresh chicken, beef & seafood', productCount: 64, active: true },
  { id: 'c4', name: 'Beverages', slug: 'beverages', desc: 'Juices, water, soda & tea', productCount: 115, active: true },
];

export interface IProductsLocalDataSource {
  getProducts(): Promise<ProductEntity[]>;
  getProductById(id: string): Promise<ProductEntity | null>;
  createProduct(product: Partial<ProductEntity>): Promise<ProductEntity>;
  deleteProduct(id: string): Promise<boolean>;
  getCategories(): Promise<ProductCategoryEntity[]>;
}

export class ProductsLocalDataSourceImpl implements IProductsLocalDataSource {
  private products = [...MOCK_PRODUCTS];
  private categories = [...MOCK_CATEGORIES];

  async getProducts(): Promise<ProductEntity[]> {
    return Promise.resolve(this.products);
  }

  async getProductById(id: string): Promise<ProductEntity | null> {
    return Promise.resolve(this.products.find((p) => p.id === id) || null);
  }

  async createProduct(product: Partial<ProductEntity>): Promise<ProductEntity> {
    const newProd: ProductEntity = {
      id: String(Date.now()),
      name: product.name || 'New Product',
      sku: product.sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
      category: product.category || 'General',
      price: product.price || '0 EGP',
      stock: product.stock || 10,
      image: product.image || '📦',
      status: 'published',
      ...product,
    };
    this.products = [newProd, ...this.products];
    return Promise.resolve(newProd);
  }

  async deleteProduct(id: string): Promise<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    return Promise.resolve(true);
  }

  async getCategories(): Promise<ProductCategoryEntity[]> {
    return Promise.resolve(this.categories);
  }
}

export const productsLocalDataSource = new ProductsLocalDataSourceImpl();
