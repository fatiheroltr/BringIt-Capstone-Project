import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [timeToUpdateCart, setTimeToUpdateCart] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(`/api/get-cart`);
      const result = await response.json();
      setCart(result.data);
      setIsCartLoaded(true);
    };
    fetchCart();
  }, [setTimeToUpdateCart, timeToUpdateCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isCartLoaded,
        timeToUpdateCart,
        setTimeToUpdateCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
