import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { extractImageUrl } from "../../utils";
import { UserContext } from "../../context/UserContext";
import LoadingCircle from "../LoadingCircle";
import { BiUserPin, BiShoppingBag, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const NavIcons = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { cart, isCartLoaded, isCartOpen, setIsCartOpen } =
    useContext(CartContext);
  const { user, isAuthenticated, loginWithRedirect, isLoading, logout } =
    useAuth0();
  const navigate = useNavigate();

  const {
    currentUser,
    setCurrentUser,
    // isCurrentUserLoaded,
    // setIsCurrentUserLoaded,
    setUser,
    error,
    setError,
  } = useContext(UserContext);

  useEffect(() => {
    isAuthenticated && setUser(user);
  }, [isAuthenticated]);

  let cartQuantity = 0;
  cart &&
    cart.map((item) => {
      cartQuantity += item.selectedQuantity;
    });

  return (
    <Wrapper>
      <CartIconContainer
        cartValue={cartQuantity}
        onClick={() =>
          !isAuthenticated ? loginWithRedirect() : setIsCartOpen(!isCartOpen)
        }
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            setIsCartOpen(!isCartOpen);
          }
        }}
      >
        <CartIcon src={extractImageUrl("cart-icon", "svg")} />
      </CartIconContainer>

      <MessageIconContainer>
        <MessageIcon
          src={extractImageUrl("message-icon", "svg")}
          onClick={() => !isAuthenticated && loginWithRedirect()}
        />
      </MessageIconContainer>

      <ProfileIconContainer
        onClick={() =>
          !isAuthenticated
            ? loginWithRedirect()
            : setIsProfileMenuOpen(!isProfileMenuOpen)
        }
      >
        {!isLoading ? (
          <ProfileIcon
            src={
              isAuthenticated
                ? user.picture
                : extractImageUrl("profile-icon", "svg")
            }
            referrerPolicy="no-referrer"
          />
        ) : (
          <LoadingCircle circleSize={28} />
        )}
      </ProfileIconContainer>
      <ProfileMenu isProfileMenuOpen={isProfileMenuOpen}>
        <MenuArrow src={extractImageUrl("menu-arrow", "svg")} />
        <Row>
          <BiUserPin size={22} />
          Profile
        </Row>
        <Row onClick={() => navigate("/orders")}>
          <BiShoppingBag size={22} />
          Orders
        </Row>
        <Row onClick={() => logout()}>
          <BiLogOut size={22} />
          Logout
        </Row>
      </ProfileMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
`;

const ProfileMenu = styled.div`
  position: absolute;
  right: -15px;
  top: 45px;
  opacity: ${(props) => (props.isProfileMenuOpen ? "1" : "0")};
  background-color: #fff;
  border: 1px solid var(--border-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  -webkit-box-shadow: -14px 16px 41px -12px rgba(0, 0, 0, 0.35);
  box-shadow: -5px 10px 15px -12px rgba(0, 0, 0, 0.25);
  transition: 0.2s ease-in-out;
`;

const Row = styled.div`
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 7px;

  &:hover {
    color: var(--teal-color);
  }
`;

const MenuArrow = styled.img`
  position: absolute;
  top: -11px;
  right: 18px;
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
