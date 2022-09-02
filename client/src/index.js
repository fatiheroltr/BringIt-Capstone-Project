import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { CartProvider } from "./context/CartContext";
import { RestaurantsProvider } from "./context/RestaurantsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <CartProvider>
    <RestaurantsProvider>
      <App />
    </RestaurantsProvider>
  </CartProvider>
  // </React.StrictMode>
);
