import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import CategoryResults from "../pages/CategoryResults";
import SearchResult from "../pages/SearchResult";
import Checkout from "../pages/Checkout";
import AuthWithRedirectProvider from "../context/AuthWithRedirectProvider";
import Dashboard from "../pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthWithRedirectProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<Restaurant />} />
          <Route path="/products/:id" element={<SearchResult />} />
          <Route
            path="/categories/:categoryParam"
            element={<CategoryResults />}
          />
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthWithRedirectProvider>
    </BrowserRouter>
  );
};

export default App;
