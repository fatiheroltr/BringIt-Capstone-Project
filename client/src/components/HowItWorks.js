import styled from "styled-components";
import { extractImageUrl, mobile } from "../utils";

const HowItWorks = () => {
  return (
    <Wrapper>
      <Title>How it works?</Title>
      <Desc>
        It works same like any another food delivery app your are using, except
        that one works only in campus!
      </Desc>
      <IconsWrapper>
        <IconContainer>
          <Icon src={extractImageUrl("how-1", "png")} />
          <IconTitle>You place the order</IconTitle>
          <IconDesc>
            Like in any other food delivery app, it starts with your pick and
            order
          </IconDesc>
        </IconContainer>
        <IconContainer>
          <Icon src={extractImageUrl("how-2", "png")} />
          <IconTitle>Store prepares it</IconTitle>
          <IconDesc>
            The store gets the order details, and prepares the items in the time
            frame descibed
          </IconDesc>
        </IconContainer>
        <IconContainer>
          <Icon src={extractImageUrl("how-3", "png")} />
          <IconTitle>Someone picks it up</IconTitle>
          <IconDesc>
            Someone available who accepted the job picks it up and brings it to
            you
          </IconDesc>
        </IconContainer>
        <IconContainer>
          <Icon src={extractImageUrl("how-4", "png")} />
          <IconTitle>You enjoy it</IconTitle>
          <IconDesc>
            You get your order at where ever you are in the campus, fun or work
            (or both) never stops
          </IconDesc>
        </IconContainer>
      </IconsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 0 150px 0;
`;

const IconsWrapper = styled.div`
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    gap: "70px",
    marginTop: "60px",
  })};
  display: flex;
  margin-top: 85px;
  gap: 85px;
`;

const Title = styled.span`
  ${mobile({
    fontSize: "40px",
  })};
  color: var(--primary-color);
  font-weight: 700;
  font-size: 45px;
  letter-spacing: -0.04em;
`;

const Desc = styled.span`
  ${mobile({
    fontSize: "22px",
    padding: "0 20px",
    textAlign: "center",
  })};
  color: var(--primary-color);
  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.04em;
  margin-top: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 245px;
`;

const Icon = styled.img`
  width: 110px;
  height: 110px;
`;

const IconTitle = styled.span`
  color: var(--teal-color);
  font-size: 22px;
  font-weight: 700;
  margin: 20px 0;
`;

const IconDesc = styled.p`
  color: var(--primary-color);
  font-size: 18px;
  letter-spacing: -0.04em;
  line-height: 135%;
  text-align: center;
`;

export default HowItWorks;
