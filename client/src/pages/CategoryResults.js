import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import styled from "styled-components";
import Content from "../components/Content";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ProductsContext } from "../context/ProductsContext";
import { CategoriesContext } from "../context/CategoriesContext";
import {
  RiCheckboxCircleFill,
  RiArrowDownSFill,
  RiArrowLeftSFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import { mobile } from "../utils";

const CategoryResults = () => {
  const { categoryParam } = useParams();
  const { restaurants, isRestaurantsLoaded } = useContext(RestaurantsContext);
  const { products } = useContext(ProductsContext);
  const { categories, isCategoriesLoaded } = useContext(CategoriesContext);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([
    categoryParam.substring(0, 1).toUpperCase() + categoryParam.substring(1),
  ]);

  useEffect(() => {
    if (
      (selectedCategories && selectedCategories.length === 0) ||
      (selectedCategories && selectedCategories[0] === "All")
    ) {
      if (categories) {
        const allCategoriesNamesFiltered = categories.map((category) => {
          return category.name;
        });
        setSelectedCategories(allCategoriesNamesFiltered);
      }
    }
  }, [selectedCategories, categories]);

  const handleClick = (categoryName) => {
    if (!selectedCategories.includes(categoryName)) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      const newselectedCategories = selectedCategories.filter(
        (category) => category.toUpperCase() !== categoryName.toUpperCase()
      );
      setSelectedCategories(newselectedCategories);
    }
  };

  return (
    <Wrapper>
      <Header navigation={true} />
      <Content marginTop={true} cart={true}>
        <CategorySelector
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          categoriesOpen={isCategoriesOpen}
        >
          <span>All Categories</span>
          {isCategoriesOpen ? <RiArrowDownSFill /> : <RiArrowLeftSFill />}
        </CategorySelector>
        <Select isCategoriesOpen={isCategoriesOpen}>
          {isCategoriesLoaded &&
            categories.map((category) => {
              return (
                <CategoryCheckbox
                  key={category._id}
                  onClick={() => handleClick(category.name)}
                >
                  {selectedCategories &&
                  selectedCategories.includes(category.name) ? (
                    <RiCheckboxCircleFill />
                  ) : (
                    <RiCheckboxBlankCircleLine />
                  )}
                  {category.name}
                </CategoryCheckbox>
              );
            })}
        </Select>

        {isCategoriesLoaded &&
          selectedCategories &&
          selectedCategories.map((category, index) => {
            return (
              <div key={index}>
                <CategoryName>{category}</CategoryName>
                {products && isRestaurantsLoaded ? (
                  <ProductsWrapper>
                    {products.map((product) => {
                      if (
                        product.category.toUpperCase() ===
                        category.toUpperCase()
                      )
                        return (
                          <ProductCard
                            productData={product}
                            restaurantData={restaurants.find(
                              (restaurant) =>
                                restaurant._id === product.store_id
                            )}
                            key={product._id}
                          />
                        );
                    })}
                  </ProductsWrapper>
                ) : (
                  <ProductsWrapper>
                    {[...Array(8)].map((e, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </ProductsWrapper>
                )}
              </div>
            );
          })}
      </Content>
      <Footer />
    </Wrapper>
  );
};

const CategorySelector = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 16px;
  position: absolute;
  right: 0;
  background-color: #fff;
  border: none;
  border-bottom: ${(props) =>
    props.isCategoriesOpen
      ? "2px solid var(--teal-color)"
      : "2px solid var(--border-color)"};
  padding: 0;
  padding-bottom: 7px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  & span {
    font-size: 18px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 75px;
  margin-bottom: 70px;
  grid-row-gap: 60px;
  ${mobile({
    gridTemplateColumns: "repeat(1, 1fr)",
  })};
`;

const CategoryName = styled.p`
  width: 100%;
  color: var(--primary-color);
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 30px;
  right: -18px;
  transition: 0.15s ease-in-out;
  z-index: 99;
  background-color: #fff;
  padding: 20px;
  padding-right: 35px;
  opacity: ${(props) => (props.isCategoriesOpen ? "1" : "0")};
  -webkit-box-shadow: -14px 16px 41px -12px rgba(0, 0, 0, 0.35);
  box-shadow: -14px 16px 41px -12px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
`;

const CategoryCheckbox = styled.div`
  color: var(--primary-color);
  font-size: 18px;
  font-weight: 700;
  display: flex;
  gap: 7px;
  align-items: center;
  cursor: pointer;
`;

// export default CategoryResults;
export default withAuthenticationRequired(CategoryResults, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
