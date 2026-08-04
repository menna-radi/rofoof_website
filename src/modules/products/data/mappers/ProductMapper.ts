import { ProductDTO, ProductCategoryDTO } from '../dtos/ProductDTO';
import { ProductEntity, ProductCategoryEntity } from '../../domain/entities/ProductEntity';

export class ProductMapper {
  static toProductEntity(dto: ProductDTO): ProductEntity {
    return {
      id: dto.product_id,
      name: dto.product_name,
      sku: dto.sku_number,
      category: dto.category_title,
      price: dto.price_egp,
      oldPrice: dto.original_price,
      stock: dto.stock_quantity,
      image: dto.image_icon,
      status: dto.publication_status,
      discountPct: dto.discount_percentage,
      salesCount: dto.total_sales,
    };
  }

  static toCategoryEntity(dto: ProductCategoryDTO): ProductCategoryEntity {
    return {
      id: dto.category_id,
      name: dto.category_name,
      slug: dto.url_slug,
      desc: dto.description,
      productCount: dto.product_count,
      active: dto.is_active,
    };
  }
}
