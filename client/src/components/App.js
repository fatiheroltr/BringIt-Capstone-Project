import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/restaurant:id" element={<Restaurant />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
