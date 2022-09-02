import { Link } from "react-router-dom";
import styled from "styled-components";
import { extractImageUrl } from "../../utils";

const Logo = () => {
  return (
    <Wrapper>
      <Link to="/">
        <LogoImage src={extractImageUrl("bringit-logo", "png")}></LogoImage>
      </Link>
      <Slogan>delivery in campus</Slogan>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 117px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const LogoImage = styled.img`
  width: 153px;
  align-self: center;
`;
const Slogan = styled.span`
  color: var(--primary-color);
  font-size: 20px;
  letter-spacing: -0.04em;
  margin-top: 10px;
  margin-left: 12px;
`;

export default Logo;
