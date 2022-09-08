import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [isProductsLoaded, setIsProductsLoaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/get-products`);
      const result = await response.json();
      setProducts(result.data);
      setIsProductsLoaded(true);
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isProductsLoaded,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
