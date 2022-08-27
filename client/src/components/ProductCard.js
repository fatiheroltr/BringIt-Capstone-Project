import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartIconSrc from "../assets/icons/little-cart-icon.svg";
import StoreIconSrc from "../assets/icons/store-icon.svg";
import styled, { keyframes } from "styled-components";
import { extractImageUrl, isStoreOpen } from "../utils";

const ProductCard = ({ productData }) => {
  const { _id, name, price, desc, store, stock, store_id } = productData;
  const [count, setCount] = useState(1);
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurantResponse = await fetch(
        `/api/get-restaurant-by-id/${store_id}`
      );
      const restaurantResult = await restaurantResponse.json();
      setRestaurant(restaurantResult.data);
    };
    fetchRestaurant();
  }, []);

  const handleDecrease = () => {
    count > 1 && setCount(count - 1);
  };

  const handleIncrease = () => {
    count < stock && setCount(count + 1);
  };

  return restaurant ? (
    <Wrapper>
      <Image src={extractImageUrl(_id, "png")} />
      <Name>{name}</Name>
      <Desc>{desc}</Desc>
      <StyledLink to={`/restaurant/${store_id}`}>
        <Store>
          <StoreIcon src={StoreIconSrc} />
          {store}
        </Store>
      </StyledLink>
      <Container>
        <Price>${price.toFixed(2)}</Price>
        <QuantityTool>
          <Indicator onClick={handleDecrease}>-</Indicator>
          <Count>{count}</Count>
          <Indicator onClick={handleIncrease}>+</Indicator>
        </QuantityTool>
        <Button
          disabled={
            !isStoreOpen(
              restaurant.operation_start,
              restaurant.operation_end
            ) && true
          }
        >
          <CartIcon src={CartIconSrc} />
          <span>ADD</span>
        </Button>
      </Container>
    </Wrapper>
  ) : (
    <SkeletonWrapper>
      <Skeleton style={{ height: "180px" }} />
      <Skeleton style={{ height: "25px", width: "170px", marginTop: "20px" }} />
      <Skeleton style={{ height: "17px", marginTop: "15px" }} />
      <Skeleton style={{ height: "17px", width: "230px", marginTop: "5px" }} />
      <SkeletonContainer style={{ marginTop: "15px" }}>
        <Skeleton
          style={{
            height: "27px",
            width: "27px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <Skeleton style={{ height: "20px", width: "150px" }} />
      </SkeletonContainer>
      <SkeletonContainer
        style={{ justifyContent: "space-between", marginTop: "24px" }}
      >
        <Skeleton style={{ height: "27px", width: "60px" }} />
        <Skeleton
          style={{
            height: "27px",
            width: "70px",
            borderRadius: "20px",
          }}
        />
        <Skeleton
          style={{
            height: "30px",
            width: "80px",
            borderRadius: "10px",
          }}
        />
      </SkeletonContainer>
    </SkeletonWrapper>
  );
};

const Wrapper = styled.div`
  width: 268px;
  display: flex;
  flex-direction: column;
`;

const SkeletonWrapper = styled.div`
  width: 267px;
  height: 370px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const loading = keyframes`
to {
    background-position-x: -20%;
  }
`;

const Skeleton = styled.div`
  border-radius: 5px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1.5s ${loading} ease-in-out infinite;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
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

const Image = styled.img`
  height: 180px;
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

export default ProductCard;
