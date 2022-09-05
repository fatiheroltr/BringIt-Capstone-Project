import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractImageUrl } from "../utils";
import styled from "styled-components";
import CategoryBarSkeleton from "./Skeletons/CategoryBarSkeleton";
import { useAuth0 } from "@auth0/auth0-react";

const CategoryBar = () => {
  const { isAuthenticated } = useAuth0();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/get-categories");
      const result = await response.json();
      setCategories(result.data);
    };
    fetchCategories();
  }, []);

  const sortedCategories =
    categories && categories.sort((a, b) => a._id - b._id);

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
              to={`category/${category.name.toLowerCase()}`}
              key={category._id}
              onClick={() => window.scrollTo(0, 0)}
              redirect_uri={`category/${category.name.toLowerCase()}`}
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
