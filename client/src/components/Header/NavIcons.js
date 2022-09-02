import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import styled from "styled-components";
import CartIconSrc from "../../assets/icons/cart-icon.svg";
import MessageIconSrc from "../../assets/icons/message-icon.svg";
import ProfileIconSrc from "../../assets/icons/profile-icon.svg";

const NavIcons = () => {
  const { cart, isCartLoaded, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  let cartQuantity = 0;
  isCartLoaded &&
    cart.map((item) => {
      cartQuantity += item.selectedQuantity;
    });

  return (
    <Wrapper>
      <CartIconContainer
        cartValue={cartQuantity}
        onClick={() => setIsCartOpen(!isCartOpen)}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            setIsCartOpen(!isCartOpen);
          }
        }}
      >
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

const CartIconContainer = styled.button`
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;

  &::after {
    content: "${(props) => props.cartValue}";
    height: 16px;
    background-color: var(--accent-color);
    position: absolute;
    right: -3px;
    top: -4px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 2px 4px 0 4px;
    visibility: ${(props) => (props.cartValue > 0 ? "visible" : "hidden")};
  }

  &:focus {
    outline: none;
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
    top: -7px;
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
