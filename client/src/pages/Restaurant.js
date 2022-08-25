import Header from "../components/Header/Header";
import Footer from "../components/Footer";

import styled from "styled-components";

const Restaurant = () => {
  return (
    <Wrapper>
      <Header />

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Restaurant;
