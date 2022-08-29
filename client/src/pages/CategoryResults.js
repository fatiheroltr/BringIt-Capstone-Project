import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import styled from "styled-components";

const CategoryResults = () => {
  const { category } = useParams();
  const { restaurants, isRestaurantsLoaded } = useContext(RestaurantsContext);
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/get-products-by-category/${category}`);
      const result = await response.json();
      setProducts(result.data);
    };
    fetchProducts();
  }, []);

  return (
    <Wrapper>
      <Header />
      <CategoryName>
        {category.substring(0, 1).toUpperCase() + category.substring(1)}
      </CategoryName>
      {products && isRestaurantsLoaded ? (
        <Content>
          {products.map((product) => {
            return (
              <ProductCard
                productData={product}
                restaurantData={restaurants.find(
                  (restaurant) => restaurant._id === product.store_id
                )}
                key={product._id}
              />
            );
          })}
        </Content>
      ) : (
        <Content>
          {[...Array(8)].map((e, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Content>
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 75px;
  margin-bottom: 100px;
  grid-row-gap: 60px;
`;

const CategoryName = styled.span`
  width: 1297px;
  color: var(--primary-color);
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export default CategoryResults;
