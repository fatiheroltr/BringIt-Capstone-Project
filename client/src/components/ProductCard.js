import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TbListSearch } from "react-icons/tb";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { extractImageUrl, mobile } from "../utils";
import { CartContext } from "../context/CartContext";
import LoadingCircle from "./LoadingCircle";
import { UserContext } from "../context/UserContext";

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

  const { timeToUpdateCart, setTimeToUpdateCart } = useContext(CartContext);

  const { currentUser } = useContext(UserContext);

  const open = () => setShowDialog(true);
  const close = () => {
    setShowDialog(false);
    setProductIngredients(ingredients);
    setProductOptions(options);
    setFinalPrice(price);
    setExcludedIngredients([]);
    setSelectedOptions([]);
    setSelectedQuantity(1);
  };

  const [showDialog, setShowDialog] = useState(false);
  const [productIngredients, setProductIngredients] = useState(ingredients);
  const [productOptions, setProductOptions] = useState(options);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [finalPrice, setFinalPrice] = useState(price);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleDecrease = () => {
    selectedQuantity > 1 && setSelectedQuantity(selectedQuantity - 1);
  };

  const handleIncrease = () => {
    selectedQuantity < stock && setSelectedQuantity(selectedQuantity + 1);
  };

  const handleRemove = (removedIngredient) => {
    setSelectedOptions(
      selectedOptions.filter((item) => item.name !== removedIngredient.name)
    );

    !options.includes(removedIngredient) &&
      setExcludedIngredients([...excludedIngredients, removedIngredient]);

    setProductIngredients(
      productIngredients.filter(
        (ingredient) => ingredient.name !== removedIngredient.name
      )
    );

    // If removed ingredient is an option, subtract its price from total
    options.find((option) => {
      if (option.name === removedIngredient.name) {
        return (
          setFinalPrice(finalPrice - parseFloat(removedIngredient.price)),
          setProductOptions([...productOptions, removedIngredient])
        );
      }
      return null;
    });
  };

  const handleAdd = (addedIngredient) => {
    setProductIngredients([...productIngredients, addedIngredient]);

    !ingredients.includes(addedIngredient) &&
      setSelectedOptions([...selectedOptions, addedIngredient]);

    setExcludedIngredients(
      excludedIngredients.filter((item) => item.name !== addedIngredient.name)
    );

    setProductOptions(
      productOptions.filter((option) => option !== addedIngredient)
    );

    // If added ingredient is an option, add its price to total
    options.find((option) => {
      if (option.name === addedIngredient.name) {
        return setFinalPrice(finalPrice + parseFloat(addedIngredient.price));
      }
      return null;
    });
  };

  const handleAddToCart = () => {
    let optionsTotal = 0;
    selectedOptions.map((option) => {
      return (optionsTotal += parseFloat(option.price));
    });
    setAddingToCart(true);

    // Sorting alphabetically, otherwise excluded ingredients in different order
    // will be a new item instead of increasing the quantity of current
    const sortedExcludedIngredients = excludedIngredients.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setExcludedIngredients(sortedExcludedIngredients);

    const sortedSelectedOptions = selectedOptions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSelectedOptions(sortedSelectedOptions);

    const cartObject = {
      ...productData,
      price: price + optionsTotal,
      excludedIngredients,
      selectedOptions,
      selectedQuantity,
    };

    const patchCart = async () => {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartObject, currentUser }),
      };
      const response = await fetch(`/api/add-to-cart`, requestOptions);
      const result = await response.json();
      if (result) {
        await setTimeToUpdateCart(!timeToUpdateCart);
        setAddingToCart(false);
        close();
      }
    };
    patchCart();
  };

  return (
    <Wrapper>
      <DialogOverlay
        style={{
          background: "hsla(0, 0%, 0%, 0.6)",
          zIndex: "99",
        }}
        isOpen={showDialog}
        onDismiss={close}
      >
        <StyledDialogContent
          // style={{
          //   boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
          //   width: "610px",
          //   borderRadius: "20px",
          //   padding: "17px",
          //   position: "relative",
          //   marginTop: "3%",
          // }}
          aria-label={productData.name}
        >
          <BigImage src={extractImageUrl(_id, "png")} />
          <DialogNameContainer>
            <Name>{name}</Name>
            <StyledLink
              to={`/restaurants/${store_id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Store>
                <StoreIcon src={extractImageUrl("store-icon", "svg")} />
                {store}
              </Store>
            </StyledLink>
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
              {excludedIngredients.length > 0 && <Title>Excluded:</Title>}
              <IngredientsContainer>
                {excludedIngredients.map((ingredient, i) => {
                  return (
                    <Ingredient key={i} removable={true}>
                      {ingredient.name}
                      <button onClick={() => handleAdd(ingredient)}>+</button>
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
              <Count>{selectedQuantity}</Count>
              <Indicator onClick={handleIncrease}>+</Indicator>
            </QuantityTool>
            <Button
              disabled={
                // !isStoreOpen(
                //   restaurantData.operation_start,
                //   restaurantData.operation_end
                // ) ||
                addingToCart && true
              }
              onClick={handleAddToCart}
            >
              {addingToCart ? (
                <LoadingCircle circleSize={25} />
              ) : (
                <>
                  <CartIcon src={extractImageUrl("little-cart-icon", "svg")} />
                  <span>ADD</span>
                </>
              )}
            </Button>
          </DialogPriceContainer>
          <DialogCloseButton className="close-button" onClick={close}>
            X
          </DialogCloseButton>
        </StyledDialogContent>
      </DialogOverlay>

      <Image imageSrc={extractImageUrl(_id, "png")} onClick={open}>
        <DetailsIcon />
      </Image>
      <Name>{name}</Name>
      <Desc>{desc}</Desc>
      <StyledLink
        to={`/restaurants/${store_id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Store>
          <StoreIcon src={extractImageUrl("store-icon", "svg")} />
          {store}
        </Store>
      </StyledLink>
      <Container>
        <Price>${finalPrice.toFixed(2)}</Price>
        <QuantityTool>
          <Indicator onClick={handleDecrease}>-</Indicator>
          <Count>{selectedQuantity}</Count>
          <Indicator onClick={handleIncrease}>+</Indicator>
        </QuantityTool>
        <Button
          disabled={
            // !isStoreOpen(
            //   restaurantData.operation_start,
            //   restaurantData.operation_end
            // ) ||
            addingToCart && true
          }
          onClick={handleAddToCart}
        >
          {addingToCart ? (
            <LoadingCircle circleSize={25} />
          ) : (
            <>
              <CartIcon src={extractImageUrl("little-cart-icon", "svg")} />
              <span>ADD</span>
            </>
          )}
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

const StyledDialogContent = styled(DialogContent)`
  box-shadow: 0px 10px 50px hsla(0, 0%, 0%, 0.33);
  width: 610px;
  border-radius: 20px;
  padding: 17px;
  position: relative;
  margin-top: 3%;
  ${mobile({
    width: "90%",
    marginTop: "20%",
  })};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;

const DetailsIcon = styled(TbListSearch)`
  position: absolute;
  width: 50px;
  height: 50px;
  color: #fff;
  opacity: 0;
  z-index: 9;
  top: 65px;
  left: 110px;
  transition: 0.2s ease-in-out;
`;

const DialogPriceContainer = styled.div`
  /* position: absolute; */
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: flex-end;
  margin-top: 25px;
  background-color: var(--ingredient);
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
  align-items: center;
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
    /* z-index: 4; */
  }

  &:hover {
    &::after {
      opacity: 1;
    }
    & ${DetailsIcon} {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const BigImage = styled.img`
  width: 100%;
  /* height: 380px; */
  margin-bottom: -5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
