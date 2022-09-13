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
  max-width: 1440px;
`;

export default Content;
