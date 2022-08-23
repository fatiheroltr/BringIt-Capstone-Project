import styled from "styled-components";
import HeroImageSrc from "../../assets/figure.png";

const Hero = () => {
  return (
    <Wrapper>
      <HeroImage src={HeroImageSrc} />
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
      </HeroText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const HeroImage = styled.img`
  width: 574px;
  margin-right: 55px;
`;

const HeroText = styled.div``;

const FirstLine = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--primary-color);
  font-size: 65px;
  font-weight: 700;
  text-align: right;
  letter-spacing: -0.04em;
  position: relative;
  margin-top: 55px;

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
