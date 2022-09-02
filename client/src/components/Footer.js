import styled from "styled-components";
import Logo from "./Header/Logo";
import { extractImageUrl } from "../utils";

const Footer = () => {
  return (
    <Wrapper>
      <IdentityContainer>
        <Logo />
        <Socials>
          <SocialIcon src={extractImageUrl("face", "png")} />
          <SocialIcon src={extractImageUrl("twitter", "png")} />
          <SocialIcon src={extractImageUrl("linkedin", "png")} />
          <SocialIcon src={extractImageUrl("insta", "png")} />
        </Socials>
        <Copyright>© 2022 Fatih Erol. All rights reserved.</Copyright>
      </IdentityContainer>
      <CategoryContainer>
        <NavCategory>
          <Category>LEGAL</Category>
          <Category>TERMS OF SERVICE</Category>
          <Category>PRIVACY</Category>
          <Category>TERMS & CONDITIONS</Category>
        </NavCategory>
        <NavCategory>
          <Category>CUSTOMER CARE</Category>
          <Category>WHERE IS MY ORDER</Category>
          <Category>CONTACT US</Category>
          <Category>FAQ</Category>
          <Category>RETURNS</Category>
          <Category>PAYMENTS</Category>
        </NavCategory>
        <NavCategory>
          <Category>COMPANY</Category>
          <Category>ABOUT US</Category>
          <Category>CARREERS</Category>
          <Category>INVESTORS</Category>
        </NavCategory>
        <NavCategory>
          <Category>HELP</Category>
          <Category>HOW IT WORKS</Category>
          <Category>ORDERING</Category>
          <Category>PAYMENT</Category>
          <Category>DELIVERY</Category>
        </NavCategory>
      </CategoryContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--light-color);
  width: 100%;
  max-width: 1440px;
  height: 260px;
  padding: 15px 44px;
`;
const IdentityContainer = styled.div``;
const Socials = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 65px;
  margin-top: 25px;
`;

const SocialIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const Copyright = styled.div`
  color: var(--primary-color);
  font-size: 16px;
  margin-top: 24px;
`;

const NavCategory = styled.ul`
  line-height: 210%;
  font-size: 14px;
  color: var(--primary-color);

  & li:nth-child(1) {
    font-weight: 700;
  }
`;

const Category = styled.li``;

export default Footer;
