import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { CartProvider } from "./context/CartContext";
import { RestaurantsProvider } from "./context/RestaurantsContext";
// import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/UserContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { ProductsProvider } from "./context/ProductsContext";

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <Auth0Provider
  //   domain={domain}
  //   clientId={clientId}
  //   redirectUri={window.location.origin}
  // >
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

  // </Auth0Provider>
  // </React.StrictMode>
);
