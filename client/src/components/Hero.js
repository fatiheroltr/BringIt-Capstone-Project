import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { extractImageUrl, mobile } from "../utils";

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
          Let’s find someone<br></br> who has<span>for you.</span>
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
  margin: 100px 0;
  ${mobile({
    flexDirection: "column",
    marginTop: "35px",
    margin: "0",
  })};
`;

const StartButton = styled.button`
  ${mobile({
    width: "70%",
    marginRight: "0",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "65px",
  })};
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
  ${mobile({
    width: "90%",
    margin: "60px 0px",
  })};
  margin-right: 55px;
  align-self: center;
  margin-top: -10px;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstLine = styled.div`
  ${mobile({ textAlign: "center", fontSize: "10vw" })};

  display: flex;
  flex-direction: column;
  color: var(--primary-color);
  font-size: 65px;
  font-weight: 700;
  text-align: right;
  letter-spacing: -0.04em;
  position: relative;
  margin-top: 15px;
  display: inline-block;

  & span {
    color: #fff;
    display: inline-block;
    background-color: var(--primary-color);
    padding: 0 15px;
    transform: rotate(-2deg);
  }
`;

const SecondLine = styled.div`
  ${mobile({ textAlign: "center", fontSize: "10vw" })};

  display: flex;
  flex-direction: column;
  color: var(--accent-color);
  font-size: 65px;
  font-weight: 700;
  text-align: right;
  letter-spacing: -0.04em;
  position: relative;
  margin-top: 15px;
  display: inline-block;
  margin-top: 30px;

  & span {
    color: #fff;
    display: inline-block;
    background-color: var(--accent-color);
    padding: 0 15px;
    margin-left: 15px;
    transform: rotate(-2deg);
  }
`;

export default Hero;
