import { withAuthenticationRequired } from "@auth0/auth0-react";
import styled from "styled-components";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const Orders = () => {
  return (
    <Section>
      <Header navigation={true} />
      <Content marginTop={true}>orders</Content>
      <Footer />
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default withAuthenticationRequired(Orders, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
