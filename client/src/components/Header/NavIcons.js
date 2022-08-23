import styled from "styled-components";
import CartIconSrc from "../../assets/cart-icon.svg";
import MessageIconSrc from "../../assets/message-icon.svg";
import ProfileIconSrc from "../../assets/profile-icon.svg";

const NavIcons = () => {
  return (
    <Wrapper>
      <CartIconContainer>
        <CartIcon src={CartIconSrc} />
      </CartIconContainer>
      <MessageIconContainer>
        <MessageIcon src={MessageIconSrc} />
      </MessageIconContainer>
      <ProfileIconContainer>
        <ProfileIcon src={ProfileIconSrc} />
      </ProfileIconContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CartIconContainer = styled.div`
  position: relative;

  &::after {
    content: "3";
    /* content: attr(value); */
    height: 16px;
    background-color: var(--accent-color);
    position: absolute;
    right: -4px;
    top: -4px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 2px 4px 0 4px;
  }
`;

const CartIcon = styled.img`
  width: 30px;
  height: 27px;
`;

const MessageIconContainer = styled.div`
  position: relative;

  &::after {
    content: "1";
    /* content: attr(value); */
    height: 16px;
    background-color: var(--accent-color);
    position: absolute;
    right: -5px;
    top: -6px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 2px 4px 0 4px;
  }
`;

const MessageIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ProfileIconContainer = styled.div``;

const ProfileIcon = styled.img`
  width: 28px;
  height: 28px;
`;

export default NavIcons;
