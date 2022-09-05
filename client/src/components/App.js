import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import CategoryResults from "../pages/CategoryResults";
import AuthWithRedirectProvider from "../context/AuthWithRedirectProvider";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthWithRedirectProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/category/:category" element={<CategoryResults />} />
        </Routes>
      </AuthWithRedirectProvider>
    </BrowserRouter>
  );
};

export default App;
