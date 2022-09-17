import styled from "styled-components";
import { FaPlaneArrival } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Redirect = () => {
  return (
    <Wrapper>
      <Icon>
        <FaPlaneArrival />
      </Icon>
      <Text>Redirecting you to the login page ...</Text>
      <Joke>
        <AiOutlineInfoCircle />
        Prepare your passport please
      </Joke>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
  padding: 30px;
`;

const Icon = styled.div`
  font-size: 100px;
`;

const Text = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;

const Joke = styled.div`
  display: flex;
  gap: 5px;
  color: var(--teal-color);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
`;

export default Redirect;
