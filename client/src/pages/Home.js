import Header from "../components/Header/Header";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Hero />
      <CategoryBar />
      <HowItWorks />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Home;
