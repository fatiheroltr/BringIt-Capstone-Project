import { createContext, useEffect, useState } from "react";

export const RestaurantsContext = createContext(null);

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState();
  const [isRestaurantsLoaded, setIsRestaurantsLoaded] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(`/api/get-restaurants`);
      const result = await response.json();
      setRestaurants(result.data);
      setIsRestaurantsLoaded(true);
    };
    fetchRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isRestaurantsLoaded,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
