import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { extractImageUrl } from "../utils";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <HeroImage src={extractImageUrl("figure", "png")} />
      <HeroText>
        <FirstLine>
          Don’t you have time to<span>grab some lunch?</span>
        </FirstLine>
        <SecondLine>
          Let’s find someone
          <p>
            <span>who has</span>
            <span>for you.</span>
          </p>
        </SecondLine>
        <StartButton
          onClick={() => {
            navigate("/categories/all");
          }}
        >
          Let’s get started
        </StartButton>
      </HeroText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin: 100px;
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  font-size: 22px;
  color: var(--primary-color);
  font-weight: 700;
  height: 47px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  margin-top: 35px;
  padding: 10px 30px;

  &:hover:enabled {
    background-color: var(--primary-color);
    color: #fff;
  }
`;

const HeroImage = styled.img`
  width: 574px;
  margin-right: 55px;
  align-self: center;
  margin-top: -10px;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstLine = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--primary-color);
  font-size: 65px;
  font-weight: 700;
  text-align: right;
  letter-spacing: -0.04em;
  position: relative;
  margin-top: 15px;

  & span {
    color: #fff;
  }

  &::after {
    content: "";
    width: 505px;
    height: 63px;
    background-color: var(--primary-color);
    position: absolute;
    z-index: -1;
    bottom: 0;
    right: -12px;
    transform: rotate(-1.12deg);
  }
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--accent-color);
  font-size: 65px;
  font-weight: 700;
  text-align: right;
  letter-spacing: -0.04em;
  position: relative;
  margin-top: 30px;

  & span:nth-child(2) {
    color: #fff;
    margin-left: 20px;
  }

  &::after {
    content: "";
    width: 223px;
    height: 63px;
    background-color: var(--accent-color);
    position: absolute;
    z-index: -1;
    bottom: 0;
    right: -8px;
    transform: rotate(-1.12deg);
  }
`;

export default Hero;
