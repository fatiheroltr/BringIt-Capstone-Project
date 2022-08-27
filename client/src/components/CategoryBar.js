import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractImageUrl } from "../utils";

import styled from "styled-components";

const CategoryBar = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/get-categories");
      const result = await response.json();
      setCategories(result.data);
    };
    fetchCategories();
  }, []);

  return (
    <Wrapper>
      {categories &&
        categories.map((category) => {
          return (
            <Link
              to={`category/${category.name.toLowerCase()}`}
              key={category._id}
            >
              <Circle>
                <CategoryImage
                  src={extractImageUrl(category._id, "png", "category-icon")}
                />
                <CategoryName>{category.name}</CategoryName>
              </Circle>
            </Link>
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
