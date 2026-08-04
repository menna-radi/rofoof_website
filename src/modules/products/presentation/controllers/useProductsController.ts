import { useState, useEffect } from 'react';
import { getProductsUseCase, getCategoriesUseCase } from '../../domain/usecases/ProductsUseCases';
import { ProductEntity, ProductCategoryEntity } from '../../domain/entities/ProductEntity';

export const useProductsController = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [categories, setCategories] = useState<ProductCategoryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getProductsUseCase.execute(), getCategoriesUseCase.execute()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { products, categories, isLoading, error };
};
