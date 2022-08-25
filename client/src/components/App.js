import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div``;

export default App;
