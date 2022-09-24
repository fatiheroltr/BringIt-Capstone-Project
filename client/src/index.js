import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { CartProvider } from "./context/CartContext";
import { RestaurantsProvider } from "./context/RestaurantsContext";
import { UserProvider } from "./context/UserContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { ProductsProvider } from "./context/ProductsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ProductsProvider>
      <CategoriesProvider>
        <CartProvider>
          <RestaurantsProvider>
            <App />
          </RestaurantsProvider>
        </CartProvider>
      </CategoriesProvider>
    </ProductsProvider>
  </UserProvider>
);
