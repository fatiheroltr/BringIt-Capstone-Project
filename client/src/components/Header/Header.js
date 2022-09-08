import Logo from "./Logo";
import Navigation from "./Navigation";
import styled from "styled-components";

const Header = ({ navigation }) => {
  return (
    <Wrapper>
      <Logo />
      {navigation && <Navigation />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 34px;
  width: 100%;
  max-width: 1440px;
  margin: auto;
  z-index: 9;
`;

export default Header;
