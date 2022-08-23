import styled from "styled-components";
import {
  IoCartOutline,
  IoChatboxEllipsesOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

const NavIcons = () => {
  return (
    <Wrapper>
      <CartIconContainer>
        <CartIcon />
      </CartIconContainer>
      <MessageIconContainer>
        <MessageIcon />
      </MessageIconContainer>
      <ProfileIconContainer>
        <ProfileIcon />
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

const CartIcon = styled(IoCartOutline)`
  width: 30px;
  height: 30px;
`;

const MessageIconContainer = styled.div`
  position: relative;

  &::after {
    content: "3";
    /* content: attr(value); */
    height: 16px;
    background-color: var(--accent-color);
    position: absolute;
    right: -5px;
    top: -4px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 2px 4px 0 4px;
  }
`;

const MessageIcon = styled(IoChatboxEllipsesOutline)`
  width: 28px;
  height: 28px;
`;

const ProfileIconContainer = styled.div``;

const ProfileIcon = styled(IoPersonCircleOutline)`
  width: 34px;
  height: 34px;
`;

export default NavIcons;
