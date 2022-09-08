import Header from "../components/Header/Header";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

import styled from "styled-components";
import Content from "../components/Content";

const Home = () => {
  return (
    <Wrapper>
      <Header navigation={true} />
      <Content marginTop={true} cart={true}>
        <Hero />
        <CategoryBar />
        <HowItWorks />
      </Content>
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
