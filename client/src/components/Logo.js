import LogoSrc from "../assets/bringit-logo.png";
import styled from "styled-components";

const Logo = () => {
  return (
    <Wrapper>
      <LogoImage src={LogoSrc}></LogoImage>
      <Slogan>delivery in campus</Slogan>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 117px;
  width: 100%;
  display: flex;
`;
const LogoImage = styled.img`
  width: 153px;
  align-self: center;
`;
const Slogan = styled.span`
  color: var(--primary-color);
  font-size: 20px;
  letter-spacing: -0.04em;
  margin-top: 54px;
  margin-left: 15px;
`;

export default Logo;
