import { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext(null);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState();
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/get-categories");
      const result = await response.json();
      setCategories(result.data);
      setIsCategoriesLoaded(true);
    };
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isCategoriesLoaded,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
