import { Link } from "react-router-dom";
import styled from "styled-components";
import { extractImageUrl, mobile } from "../../utils";

const Logo = ({ imageSize, sloganSize }) => {
  return (
    <Wrapper>
      <Link to="/">
        <LogoImage
          src={extractImageUrl("bringit-logo", "png")}
          imageSize={imageSize}
        ></LogoImage>
      </Link>
      <Slogan sloganSize={sloganSize}>delivery in campus</Slogan>
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
  /* width: 153px; */
  width: ${(props) => props.imageSize + "px"};
  align-self: center;
`;
const Slogan = styled.span`
  color: var(--primary-color);
  /* font-size: 20px; */
  font-size: ${(props) => props.sloganSize + "px"};
  letter-spacing: -0.04em;
  margin-top: 10px;
  margin-left: 12px;
  ${mobile({ display: "none", marginLeft: "0" })};
`;

export default Logo;
