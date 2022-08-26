import { useState } from "react";
import CartIconSrc from "../assets/icons/little-cart-icon.svg";
import StoreIconSrc from "../assets/icons/store-icon.svg";
import styled from "styled-components";

const ProductCard = ({ productData }) => {
  const { imageSrc, name, price, desc, store, stock } = productData;
  const [count, setCount] = useState(1);

  const handleDecrease = () => {
    count > 1 && setCount(count - 1);
  };

  const handleIncrease = () => {
    count < stock && setCount(count + 1);
  };

  return (
    <Wrapper>
      <Image src={imageSrc} />
      <Name>{name}</Name>
      <Desc>{desc}</Desc>
      <Store>
        <StoreIcon src={StoreIconSrc} />
        {store}
      </Store>
      <Container>
        <Price>${price.toFixed(2)}</Price>
        <QuantityTool>
          <Indicator onClick={handleDecrease}>-</Indicator>
          <Count>{count}</Count>
          <Indicator onClick={handleIncrease}>+</Indicator>
        </QuantityTool>
        <Button>
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

const Store = styled.div`
  display: flex;
  align-items: center;
  color: var(--teal-color);
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
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
`;

const CartIcon = styled.img`
  color: #fff;
  height: 19px;
`;

export default ProductCard;
