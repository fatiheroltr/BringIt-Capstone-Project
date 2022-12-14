import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { extractImageUrl, mobile } from "../utils";
import styled from "styled-components";
import CategoryBarSkeleton from "./Skeletons/CategoryBarSkeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { CategoriesContext } from "../context/CategoriesContext";

const CategoryBar = () => {
  const { isAuthenticated } = useAuth0();
  const { categories, isCategoriesLoaded } = useContext(CategoriesContext);

  const sortedCategories =
    isCategoriesLoaded && categories.sort((a, b) => a._id - b._id);

  return (
    <Wrapper>
      {categories ? (
        sortedCategories.map((category) => {
          // if (isAuthenticated) {
          //   return (
          //     <Link
          //       to={`category/${category.name.toLowerCase()}`}
          //       key={category._id}
          //       onClick={() => window.scrollTo(0, 0)}
          //     >
          //       <Circle>
          //         <CategoryImage
          //           src={extractImageUrl(category._id, "png", "category-icon")}
          //         />
          //         <CategoryName>{category.name}</CategoryName>
          //       </Circle>
          //     </Link>
          //   );
          // }
          return (
            <Link
              to={`categories/${category.name.toLowerCase()}`}
              key={category._id}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              redirect_uri={`categories/${category.name.toLowerCase()}`}
            >
              <Circle>
                <CategoryImage
                  src={extractImageUrl(category._id, "png", "category-icon")}
                />
                <CategoryName>{category.name}</CategoryName>
              </Circle>
            </Link>
          );
        })
      ) : (
        <CategoryBarSkeleton />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 42px;
  ${mobile({
    gap: "60px 5vw",
    flexWrap: "wrap",
    marginTop: "130px",
  })};
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
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
