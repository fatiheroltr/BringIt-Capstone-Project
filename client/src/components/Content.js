import styled from "styled-components";
import { mobile } from "../utils";
import Cart from "./Cart";

const Content = ({ children, marginTop }) => {
  return (
    <Wrapper marginTop={marginTop}>
      {children}
      <Cart />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: ${(props) => props.marginTop && "117px"};
  min-height: calc(100vh - 377px);
  width: 100%;
  padding: 0 65px;
  ${mobile({ padding: "0px", justifyContent: "flex-start" })};
  max-width: 1440px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Content;
