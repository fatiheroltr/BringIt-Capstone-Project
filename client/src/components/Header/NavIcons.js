import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { extractImageUrl } from "../../utils";

const NavIcons = () => {
  const { cart, isCartLoaded, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        <CartIcon src={extractImageUrl("cart-icon", "svg")} />
      </CartIconContainer>

      <MessageIconContainer>
        <MessageIcon src={extractImageUrl("message-icon", "svg")} />
      </MessageIconContainer>
      <LogoutButton />
      <ProfileIconContainer onClick={() => loginWithRedirect()}>
        <ProfileIcon
          src={
            isAuthenticated
              ? user.picture
              : extractImageUrl("profile-icon", "svg")
          }
        />
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
  padding: 0;

  &::after {
    content: "${(props) => props.cartValue}";
    height: 16px;
    background-color: var(--accent-color);
    position: absolute;
    right: -4px;
    top: -5px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 1px 5px;
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

const MessageIconContainer = styled.button`
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  &::after {
    content: "3";
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
    padding: 1px 5px;
  }
`;

const MessageIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ProfileIconContainer = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
`;

const ProfileIcon = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export default NavIcons;
