import styled from "styled-components";
import { categories } from "./categories";

const CategoryBar = () => {
  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <Circle key={category.id}>
            <CategoryImage src={category.imgSrc} />
            <CategoryName>{category.name}</CategoryName>
          </Circle>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 115px;
  height: 115px;
  background-color: var(--light-color);
  border-radius: 50%;
  position: relative;
`;

const CategoryName = styled.span`
  position: absolute;
  bottom: -30px;
  font-weight: 700;
  color: var(--primary-color);
`;

const CategoryImage = styled.img`
  height: 60px;
`;

export default CategoryBar;
