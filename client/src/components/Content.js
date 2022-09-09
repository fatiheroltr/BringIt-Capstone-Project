import styled from "styled-components";
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
  width: auto;
`;

export default Content;
