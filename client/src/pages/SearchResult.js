import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import styled from "styled-components";
import Content from "../components/Content";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const SearchResults = () => {
  const { id } = useParams();
  const { restaurants, isRestaurantsLoaded } = useContext(RestaurantsContext);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/get-product-by-id/${id}`);
      const result = await response.json();
      setProduct(result.data);
    };
    fetchProduct();
  }, [id]);

  return (
    <Wrapper>
      <Header navigation={true} />
      <Content marginTop={true} cart={true}>
        <CategoryName>
          {product &&
            product.category.substring(0, 1).toUpperCase() +
              product.category.substring(1)}
        </CategoryName>
        {product && isRestaurantsLoaded ? (
          <ProductsWrapper>
            <ProductCard
              productData={product}
              restaurantData={restaurants.find(
                (restaurant) => restaurant._id === product.store_id
              )}
              key={product._id}
            />
          </ProductsWrapper>
        ) : (
          <ProductsWrapper>
            <ProductCardSkeleton />
          </ProductsWrapper>
        )}
      </Content>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsWrapper = styled.div`
  margin-bottom: 100px;
`;

const CategoryName = styled.p`
  width: 1297px;
  color: var(--primary-color);
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

// export default CategoryResults;
export default withAuthenticationRequired(SearchResults, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
