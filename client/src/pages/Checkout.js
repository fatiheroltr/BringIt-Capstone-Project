import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../components/Content";
import DeliveryMap from "../components/DeliveryMap";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { extractImageUrl } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItemSkeleton from "../components/Skeletons/CheckoutItemSkeleton";
import CheckoutTotalSkeleton from "../components/Skeletons/CheckoutTotalSkeleton";
import { FiAlertCircle } from "react-icons/fi";
import moment from "moment";

const Checkout = () => {
  const { cart, isCartLoaded, setTimeToUpdateCart, timeToUpdateCart } =
    useContext(CartContext);
  const { currentUser, setUser } = useContext(UserContext);
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const { state } = useLocation();
  const [tip, setTip] = useState(15);
  const [deliveryName, setDeliveryName] = useState();
  const [deliveryInstructions, setDeliveryInstructions] = useState();
  const [locations, setLocation] = useState();

  const navigate = useNavigate();

  console.log("deliveryName: ", deliveryName);

  useEffect(() => {
    isAuthenticated && setUser(user);
  }, [isAuthenticated]);

  const handlePlaceOrder = async () => {
    const orderObject = {
      cart: cart,
      name: deliveryName,
      email: currentUser.email,
      instructions: deliveryInstructions,
      lat: locations.latitude,
      lng: locations.longitude,
      date: moment().format("lll"),
    };

    const placeOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderObject),
    };
    const deleteOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    };
    const placeOrder = await fetch(`/api/place-order`, placeOptions);
    const deleteCart = await fetch(
      `/api/clear-the-cart/${currentUser.email}`,
      deleteOptions
    );
    setTimeToUpdateCart(!timeToUpdateCart);
    navigate("/");
  };

  return (
    <Section>
      <Header navigation={false} />
      <Content marginTop={true}>
        <Wrapper>
          <Container>
            <Title>Order Summary</Title>
            <OrderSummary>
              {isCartLoaded ? (
                cart.map((product) => {
                  return (
                    <ProductSection key={product._id}>
                      <ProductContainer>
                        <Image src={extractImageUrl(product.id, "png")} />
                        <ProductDetails>
                          <ProductName>{product.name}</ProductName>
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
                        </ProductDetails>
                        <Quantity>( {product.selectedQuantity} )</Quantity>
                        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                      </ProductContainer>
                      <Store>{product.store}</Store>
                    </ProductSection>
                  );
                })
              ) : (
                <CheckoutItemSkeleton />
              )}
              {state.subTotal && isCartLoaded ? (
                <TotalDetailsContainer>
                  <TotalContentSection style={{ flex: "3" }}>
                    <span>Sub Total:</span>
                    <span>Tax:</span>
                    <span>Delivery fee:</span>
                    <span>Service fee:</span>
                    <span>Tip %</span>
                    <span>Total:</span>
                  </TotalContentSection>
                  <TotalContentSection style={{ flex: "1" }}>
                    <span>${state.subTotal.toFixed(2)}</span>
                    <span>${(state.subTotal * 0.15).toFixed(2)}</span>
                    <span>${(state.subTotal * 0.15).toFixed(2)}</span>
                    <span>${(state.subTotal * 0.1).toFixed(2)}</span>
                    <Tip
                      defaultValue={tip}
                      // Input accepts only numbers
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(ev) =>
                        setTip(ev.target.value ? parseInt(ev.target.value) : 0)
                      }
                    />
                    <span>
                      $
                      {(
                        state.subTotal +
                        state.subTotal * 0.15 +
                        state.subTotal * 0.15 +
                        state.subTotal * 0.1 +
                        (state.subTotal * tip) / 100
                      ).toFixed(2)}
                    </span>
                  </TotalContentSection>
                </TotalDetailsContainer>
              ) : (
                <CheckoutTotalSkeleton />
              )}
            </OrderSummary>
          </Container>
          <Container>
            <Title>Delivery Details</Title>
            <DeliveryDetails>
              <DeliveryMap setLocation={setLocation} />
              <Hint>
                <FiAlertCircle size={22} />
                Please drag and drop the pin on delivery point
              </Hint>
              <Input
                placeholder="Name for delivery*"
                style={{ marginTop: "35px" }}
                onChange={(ev) => setDeliveryName(ev.target.value)}
              />
              <Input
                placeholder="Delivery Instructions (optional)"
                onChange={(ev) => setDeliveryInstructions(ev.target.value)}
              />
              <PlaceOrderButton
                onClick={handlePlaceOrder}
                disabled={!deliveryInstructions && !deliveryName && true}
              >
                PLACE YOUR ORDER
              </PlaceOrderButton>
            </DeliveryDetails>
          </Container>
        </Wrapper>
      </Content>
      <Footer />
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hint = styled.p`
  font-size: 18px;
  color: var(--primary-color);
  letter-spacing: -0.04em;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PlaceOrderButton = styled.button`
  font-size: 18px;
  color: var(--primary-color);
  font-weight: 700;
  width: 268px;
  height: 47px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  align-self: center;
  margin-top: 30px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: var(--primary-color);
    color: #fff;
  }
`;

const Input = styled.input`
  color: var(--primary-color);
  font-size: 20px;
  padding: 10px 20px;
  height: 35px;
  border: none;
  background-color: var(--light-color);
  border-radius: 10px;
  margin-top: 20px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 30%;
  }
`;

const ProductSection = styled.div`
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  gap: 20px;
`;

const Tip = styled.input`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  text-align: right;
  width: 22px;
  border: none;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 10px;
  padding: 0;

  &:focus {
    outline: none;
    border-bottom: 2px solid var(--teal-color);
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const OrderSummary = styled.div`
  width: 700px;
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DeliveryDetails = styled.div`
  width: 600px;
  height: 100%;
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: var(--primary-color);
`;

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Image = styled.img`
  width: 100px;
  flex: 1;
  align-self: flex-start;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;
const ProductName = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-color);
`;

const Quantity = styled.span`
  flex: 1;
  align-self: flex-start;
  min-height: 66px;
  display: flex;
  align-items: center;
`;
const ProductPrice = styled.span`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
  align-self: flex-start;
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ExtrasWrapper = styled.div``;

const Extras = styled.div`
  font-size: 14px;
  color: var(--primary-color);
  margin: 10px 0;
`;

const ExtrasTitle = styled.p`
  margin-bottom: 7px;
  font-weight: 700;
`;

const ExtrasItems = styled.span`
  font-style: italic;
`;

const Excludes = styled.span``;
const Options = styled.span``;

const Store = styled.div`
  display: flex;
  align-items: center;
  color: var(--teal-color);
  font-size: 14px;
  font-weight: 700;
  margin-top: 15px;
`;

const TotalDetailsContainer = styled.div`
  display: flex;
`;

const TotalContentSection = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & span {
    margin-bottom: 15px;
  }

  & span:last-child {
    color: var(--teal-color);
    margin-top: 10px;
    font-size: 20px;
  }
`;

export default withAuthenticationRequired(Checkout, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
