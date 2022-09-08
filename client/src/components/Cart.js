import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import LoadingCircle from "./LoadingCircle";
import { extractImageUrl } from "../utils";
import styled from "styled-components";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    setCart,
    isCartLoaded,
    isCartOpen,
    setIsCartOpen,
    timeToUpdateCart,
    setTimeToUpdateCart,
  } = useContext(CartContext);

  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [updatingCart, setUpdatingCart] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState();

  const patchCart = async (updateObject) => {
    if (currentUser) {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updateObject, currentUser }),
      };
      const response = await fetch(
        `/api/update-quantity-in-cart`,
        requestOptions
      );
      const result = await response.json();
      if (result) {
        await setTimeToUpdateCart(!timeToUpdateCart);
        setUpdatingCart(false);
      }
    }
  };

  const deleteFromCart = async (id) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, currentUser }),
    };
    const response = await fetch(`/api/delete-item-from-cart`, requestOptions);
    const result = await response.json();
    if (result) {
      await setTimeToUpdateCart(!timeToUpdateCart);
      setUpdatingCart(false);
    }
  };

  const handleIncrease = (id) => {
    setUpdatingCart(true);
    const updateObject = {
      _id: id,
      action: 1,
    };
    patchCart(updateObject);
  };

  const handleDecrease = (id, selectedQuantity) => {
    if (selectedQuantity < 2) {
      const deleteObject = { _id: id };
      deleteFromCart(deleteObject);
    } else {
      setUpdatingCart(true);
      const updateObject = {
        _id: id,
        action: -1,
      };
      patchCart(updateObject);
    }
  };

  useEffect(() => {
    setSubTotal(0);
    let newSubTotal = 0;
    if (cart) {
      cart.map((product) => {
        newSubTotal += product.price * product.selectedQuantity;
      });
    }
    setSubTotal(newSubTotal);
  }, [cart]);
  return (
    <Wrapper>
      <Container
        tabIndex="0"
        isCartOpen={isCartOpen}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            setIsCartOpen(!isCartOpen);
          }
        }}
      >
        <CartTitleContainer>
          <CartIcon>
            <CartImg />
          </CartIcon>
          <CartTitle>
            {user && user.given_name ? user.given_name + "'s" : "Your"} Cart
          </CartTitle>
        </CartTitleContainer>

        {cart && cart.length > 0 ? (
          <CartContent>
            {isCartLoaded &&
              cart.map((product) => {
                return (
                  <div key={uuidv4()}>
                    {product.selectedQuantity > 0 && (
                      <ProductContainer>
                        <ProductDetails>
                          <ProductSection>
                            <Image src={extractImageUrl(product.id, "png")} />
                            <ProductInnerSection>
                              <ProductName>{product.name}</ProductName>
                              <ProductPrice>${product.price}</ProductPrice>
                            </ProductInnerSection>
                          </ProductSection>
                          <ProductSection>
                            <QuantityTool>
                              {!updatingCart ? (
                                <>
                                  <Indicator
                                    onClick={() => {
                                      if (product.selectedQuantity > 0) {
                                        handleDecrease(
                                          product._id,
                                          product.selectedQuantity
                                        );
                                      }
                                      setUpdatedProduct(product._id);
                                    }}
                                  >
                                    -
                                  </Indicator>
                                  <Count>{product.selectedQuantity}</Count>
                                  <Indicator
                                    onClick={() => {
                                      if (
                                        product.selectedQuantity < product.stock
                                      ) {
                                        handleIncrease(product._id);
                                      }
                                      setUpdatedProduct(product._id);
                                    }}
                                  >
                                    +
                                  </Indicator>
                                </>
                              ) : updatedProduct === product._id ? (
                                <LoadingCircle circleSize={20} />
                              ) : (
                                <>
                                  <Indicator>-</Indicator>
                                  <Count>{product.selectedQuantity}</Count>
                                  <Indicator>+</Indicator>
                                </>
                              )}
                            </QuantityTool>
                          </ProductSection>
                        </ProductDetails>
                        {(product.excludedIngredients.length > 0 ||
                          product.selectedOptions.length > 0) && (
                          <ExtrasWrapper>
                            {product.excludedIngredients.length > 0 && (
                              <Extras style={{ marginBottom: "10px" }}>
                                <ExtrasTitle>Excludes:</ExtrasTitle>
                                <ExtrasItems>
                                  {product.excludedIngredients.map(
                                    (ingredient) => {
                                      return (
                                        <Excludes key={uuidv4()}>
                                          {product.excludedIngredients.indexOf(
                                            ingredient
                                          ) ===
                                          product.excludedIngredients.length - 1
                                            ? ingredient.name
                                            : ingredient.name + ", "}
                                        </Excludes>
                                      );
                                    }
                                  )}
                                </ExtrasItems>
                              </Extras>
                            )}

                            {product.selectedOptions.length > 0 && (
                              <Extras>
                                <ExtrasTitle>Options:</ExtrasTitle>
                                <ExtrasItems>
                                  {product.selectedOptions.map((option) => {
                                    return (
                                      <Options key={uuidv4()}>
                                        {product.selectedOptions.indexOf(
                                          option
                                        ) ===
                                        product.selectedOptions.length - 1
                                          ? `${option.name} ($${option.price})`
                                          : `${option.name} ($${option.price}), `}
                                      </Options>
                                    );
                                  })}
                                </ExtrasItems>
                              </Extras>
                            )}
                          </ExtrasWrapper>
                        )}
                        <Store>
                          <StoreIcon
                            src={extractImageUrl("store-icon", "svg")}
                          />
                          {product.store}
                        </Store>
                      </ProductContainer>
                    )}
                  </div>
                );
              })}
            {/* <CloseCartButton>
              <CloseButton />
            </CloseCartButton> */}
            <TotalDetailsContainer>
              <TotalContentSection style={{ flex: "3" }}>
                <span>Sub Total:</span>
                <span>Tax:</span>
                <span>Delivery fee:</span>
                <span>Service fee:</span>
                <span>Total:</span>
              </TotalContentSection>
              <TotalContentSection style={{ flex: "1" }}>
                <span>${subTotal.toFixed(2)}</span>
                <span>${(subTotal * 0.15).toFixed(2)}</span>
                <span>${(subTotal * 0.15).toFixed(2)}</span>
                <span>${(subTotal * 0.1).toFixed(2)}</span>
                <span>
                  $
                  {(
                    subTotal +
                    subTotal * 0.15 +
                    subTotal * 0.15 +
                    subTotal * 0.1
                  ).toFixed(2)}
                </span>
              </TotalContentSection>
            </TotalDetailsContainer>
            <CheckoutButton
              onClick={() => {
                subTotal && navigate("/checkout", { state: { subTotal } });
                setIsCartOpen(false);
              }}
            >
              <CheckoutIcon />
              CHECKOUT
            </CheckoutButton>
          </CartContent>
        ) : (
          <EmptyCartContainer>
            <EmptyCartImage src={extractImageUrl("empty-cart", "png")} />
            <p>Cart is Empty</p>
            <span>
              You haven't added anything yet. Let's find something yummy
            </span>
          </EmptyCartContainer>
        )}
      </Container>
    </Wrapper>
  );
};

const EmptyCartImage = styled.img`
  width: 175px;
  margin-top: -140px;
  filter: grayscale(100%);
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: 700;
  opacity: 0.5;

  & p {
    color: var(--primary-color);
    font-size: 20px;
    margin-top: 20px;
  }

  & span {
    color: var(--teal-color);
    font-size: 16px;
    width: 250px;
    text-align: center;
    margin-top: 10px;
    line-height: 22px;
  }
`;

const CheckoutButton = styled.button`
  margin: auto;
  margin-top: 15px;
  width: 250px;
  height: 35px;
  border: none;
  background-color: var(--teal-color);
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    scale: 1.1;
    background-color: var(--primary-color);
  }
`;

const CheckoutIcon = styled(MdPayment)`
  width: 20px;
  height: 20px;
`;

const TotalDetailsContainer = styled.div`
  display: flex;
  padding: 15px 0;
  height: 200px;
`;

const TotalContentSection = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  text-align: right;
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  & span {
    margin-bottom: 15px;
  }

  & span:last-child {
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const CartContent = styled.div`
  margin-top: 66px;
  height: auto;
`;

const Container = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 117px;
  right: ${(props) => (props.isCartOpen ? "0px" : "-400px")};
  width: 370px;
  height: calc(100vh - 117px);
  background-color: #fff;
  z-index: 99;
  transition: 0.3s ease-in-out;
  -webkit-box-shadow: 1px 30px 36px 10px rgba(0, 0, 0, 0.61);
  box-shadow: 3px 40px 36px 4px rgba(0, 0, 0, 0.31);
  padding: 0 20px 40px 20px;

  &:focus {
    outline: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
`;

const CloseCartButton = styled.button`
  font-size: 18px;
  border: none;
  font-weight: 700;
  position: absolute;
  left: -25px;
  top: 23px;
  background-color: #fff;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(IoIosPlay)``;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px 0;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--border-color);
  padding: 15px 0;
`;

const ExtrasWrapper = styled.div``;

const Extras = styled.div`
  font-size: 14px;
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const ExtrasTitle = styled.p`
  margin-bottom: 7px;
  font-weight: 700;
`;

const ExtrasItems = styled.span`
  font-style: italic;
`;

const Store = styled.div`
  display: flex;
  align-items: center;
  color: var(--teal-color);
  font-size: 14px;
  font-weight: 700;
`;

const StoreIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const ProductSection = styled.div`
  display: flex;
  gap: 12px;
`;

const ProductInnerSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const Image = styled.img`
  width: 60px;
`;

const CartIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: var(--primary-color);
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartImg = styled(MdOutlineShoppingCart)`
  width: 18px;
  height: 18px;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
`;
const Excludes = styled.span``;
const Options = styled.span``;
const ProductQuantity = styled.div``;
const ProductPrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--teal-color);
`;

const QuantityTool = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70px;
  height: 30px;
  background-color: var(--light-color);
  border-radius: 20px;
`;

const Indicator = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  color: var(--primary-color);
  font-size: 16px;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    color: #fff;
    background-color: var(--primary-color);
    opacity: 0.2;
  }
`;

const Count = styled.span`
  color: var(--primary-color);
  font-size: 16px;
  font-weight: 700;
`;

const CartTitleContainer = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
  background-color: #fff;
  padding-top: 20px;
`;

const CartTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
`;

export default Cart;
