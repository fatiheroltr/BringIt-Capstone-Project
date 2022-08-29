import { useState } from "react";
import { Link } from "react-router-dom";
import CartIconSrc from "../assets/icons/little-cart-icon.svg";
import StoreIconSrc from "../assets/icons/store-icon.svg";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { extractImageUrl, isStoreOpen } from "../utils";

const ProductCard = ({ productData, restaurantData }) => {
  const {
    _id,
    name,
    price,
    desc,
    store,
    stock,
    store_id,
    ingredients,
    options,
  } = productData;

  const [count, setCount] = useState(1);

  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => {
    setShowDialog(false);
    setProductIngredients(ingredients);
    setProductOptions(options);
    setFinalPrice(price);
  };

  const [productIngredients, setProductIngredients] = useState(ingredients);
  const [productOptions, setProductOptions] = useState(options);
  const [finalPrice, setFinalPrice] = useState(price);

  const handleDecrease = () => {
    count > 1 && setCount(count - 1);
  };

  const handleIncrease = () => {
    count < stock && setCount(count + 1);
  };

  const handleRemove = (removedIngredient) => {
    const newIngredients = productIngredients.filter(
      (ingredient) => ingredient.name !== removedIngredient.name
    );
    setProductIngredients(newIngredients);

    options.find((option) => {
      if (option.name === removedIngredient.name) {
        setFinalPrice(finalPrice - parseFloat(removedIngredient.price));
        const newOptions = [...productOptions];
        newOptions.push(removedIngredient);
        setProductOptions(newOptions);
      }
    });
  };

  const handleAdd = (addedIngredient) => {
    const addToIngredients = [...productIngredients];
    addToIngredients.push(addedIngredient);
    setProductIngredients(addToIngredients);

    const newOptions = productOptions.filter(
      (option) => option !== addedIngredient
    );
    setProductOptions(newOptions);

    options.find((option) => {
      if (option.name === addedIngredient.name) {
        setFinalPrice(finalPrice + parseFloat(addedIngredient.price));
      }
    });
  };

  return (
    <Wrapper>
      <DialogOverlay
        style={{ background: "hsla(0, 0%, 0%, 0.5)", zIndex: "9" }}
        isOpen={showDialog}
        onDismiss={close}
      >
        <DialogContent
          style={{
            boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
            width: "610px",
            borderRadius: "20px",
            padding: "17px",
            position: "relative",
          }}
          aria-label={productData.name}
        >
          <BigImage src={extractImageUrl(_id, "png")} />
          <DialogNameContainer>
            <Name>{name}</Name>
            <Store>
              <StoreIcon src={StoreIconSrc} />
              {store}
            </Store>
          </DialogNameContainer>

          <Desc>{desc}</Desc>
          {ingredients && (
            <IngredientsWrapper>
              <Title>Ingredients:</Title>
              <IngredientsContainer>
                {productIngredients.map((ingredient, i) => {
                  return (
                    <Ingredient key={i} removable={ingredient.removable}>
                      {ingredient.name}
                      {ingredient.removable && (
                        <button onClick={() => handleRemove(ingredient)}>
                          x
                        </button>
                      )}
                    </Ingredient>
                  );
                })}
              </IngredientsContainer>
              {productOptions.length > 0 && <Title>Options:</Title>}
              <IngredientsContainer>
                {productOptions.map((option, i) => {
                  return (
                    <Ingredient
                      key={i}
                      removable={option.removable}
                      options={true}
                    >
                      {option.name}
                      <button onClick={() => handleAdd(option)}>+</button>
                    </Ingredient>
                  );
                })}
              </IngredientsContainer>
            </IngredientsWrapper>
          )}
          <DialogPriceContainer>
            <Price>${finalPrice.toFixed(2)}</Price>
            <QuantityTool>
              <Indicator onClick={handleDecrease}>-</Indicator>
              <Count>{count}</Count>
              <Indicator onClick={handleIncrease}>+</Indicator>
            </QuantityTool>
            <Button
              disabled={
                !isStoreOpen(
                  restaurantData.operation_start,
                  restaurantData.operation_end
                ) && true
              }
            >
              <CartIcon src={CartIconSrc} />
              <span>ADD</span>
            </Button>
          </DialogPriceContainer>
          <DialogCloseButton className="close-button" onClick={close}>
            X
          </DialogCloseButton>
        </DialogContent>
      </DialogOverlay>

      <Image imageSrc={extractImageUrl(_id, "png")} onClick={open} />
      <Name>{name}</Name>
      <Desc>{desc}</Desc>
      <StyledLink
        to={`/restaurant/${store_id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <Store>
          <StoreIcon src={StoreIconSrc} />
          {store}
        </Store>
      </StyledLink>
      <Container>
        <Price>${finalPrice.toFixed(2)}</Price>
        <QuantityTool>
          <Indicator onClick={handleDecrease}>-</Indicator>
          <Count>{count}</Count>
          <Indicator onClick={handleIncrease}>+</Indicator>
        </QuantityTool>
        <Button
          disabled={
            !isStoreOpen(
              restaurantData.operation_start,
              restaurantData.operation_end
            ) && true
          }
        >
          <CartIcon src={CartIconSrc} />
          <span>ADD</span>
        </Button>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 268px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;

const DialogPriceContainer = styled.div`
  /* position: absolute; */
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: flex-end;
  margin-top: 25px;
  background-color: var(--ingredient-removable);
  bottom: 0;
  width: 100%;
  left: 0;
  border-radius: 0px 0px 15px 15px;
  height: 66px;
  padding-right: 20px;
`;

const DialogNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  margin-top: 20px;
  margin-bottom: 10px;
`;

const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Ingredient = styled.span`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  background-color: ${(props) =>
    !props.options
      ? props.removable
        ? "var(--ingredient-removable)"
        : "var(--ingredient)"
      : "var(--ingredient-option)"};
  padding: 5px 12px;
  border-radius: 20px;

  & button {
    border: none;
    color: var(--primary-color);
    font-weight: 700;
    font-size: 16px;
    padding: 0 0 0 10px;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Store = styled.div`
  display: flex;
  align-items: center;
  color: var(--teal-color);
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;

  &:hover {
    color: var(--primary-color);
  }
`;

const StoreIcon = styled.img`
  margin-right: 5px;
`;

const Image = styled.button`
  width: 268px;
  height: 180px;
  border: none;
  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  position: relative;

  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    width: inherit;
    height: inherit;
    background-color: hsla(0, 0%, 0%, 0.35);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

const BigImage = styled.img`
  width: 100%;
  height: 380px;
  margin-bottom: -5px;
`;

const Name = styled.span`
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
  margin-top: 27px;
`;

const Desc = styled.p`
  color: var(--primary-color);
  font-size: 16px;
  margin-top: 12px;
  line-height: 20px;
`;
const Price = styled.span`
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
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

const Button = styled.button`
  width: 82px;
  height: 35px;
  background-color: var(--teal-color);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  border: none;
  transition: 0.2s ease;

  & span {
    font-size: 13px;
    font-weight: 700;
    margin-left: 6px;
  }

  &:hover {
    background-color: var(--primary-color);
    color: #fff;
    transform: scale(1.1);
    cursor: pointer;
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.1;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

const CartIcon = styled.img`
  color: #fff;
  height: 19px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const DialogCloseButton = styled.button`
  position: absolute;
  top: -7px;
  right: -7px;
  width: 30px;
  height: 30px;
  border: none;
  padding: 7px;
  border-radius: 50%;
  font-weight: 700;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: var(--light-color);
  }
`;

export default ProductCard;
