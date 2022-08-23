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
`;

export default Header;
