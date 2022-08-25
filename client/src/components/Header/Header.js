import Logo from "./Logo";
import Navigation from "./Navigation";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Logo />
      <Navigation />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 34px;
  width: 100%;
  max-width: 1440px;
  margin: auto;
`;

export default Header;
