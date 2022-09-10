import styled from "styled-components";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const Dashboard = () => {
  return (
    <Section>
      <Header navigation={true} />
      <Content marginTop={true}>
        <Wrapper>
          <span>TEST</span>
        </Wrapper>
      </Content>
      <Footer />
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Dashboard;
