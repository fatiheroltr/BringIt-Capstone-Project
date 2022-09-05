import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [cart, setCart] = useState();
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [timeToUpdateCart, setTimeToUpdateCart] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchCart = async () => {
        const response = await fetch(`/api/get-cart/${currentUser.email}`);
        const result = await response.json();
        result && setCart(result.data);
        setIsCartLoaded(true);
      };
      fetchCart();
    }
  }, [setTimeToUpdateCart, timeToUpdateCart, currentUser]);

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
