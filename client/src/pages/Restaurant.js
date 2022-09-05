import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Content from "../components/Content";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { extractImageUrl, isStoreOpen } from "../utils";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import RestaurantBannerSkeleton from "../components/Skeletons/RestaurantBannerSkeleton";
import styled from "styled-components";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Restaurant = () => {
  const { id } = useParams();
  const { restaurants, isRestaurantsLoaded } = useContext(RestaurantsContext);
  const restaurant =
    isRestaurantsLoaded &&
    restaurants.find((restaurant) => restaurant._id === parseInt(id));

  const [products, setProducts] = useState();
  const uniqueCategories = products && [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/get-products-by-store/${id}`);
      const result = await response.json();
      setProducts(result.data);
    };
    fetchProducts();
  }, []);

  return (
    <Wrapper>
      <Header />
      {restaurant && products ? (
        <>
          <BannerContainer bannerSrc={extractImageUrl(id, "jpg", "banner")}>
            <Logo src={extractImageUrl(id, "png", "logo")} />
            <StoreInfo>
              <StoreName>{restaurant.name}</StoreName>
              <StoreHours>
                {isStoreOpen(
                  restaurant.operation_start,
                  restaurant.operation_end
                )
                  ? "OPEN"
                  : "CLOSED"}{" "}
                - {restaurant.operation_start + ":00"} /{" "}
                {restaurant.operation_end + ":00"}
              </StoreHours>
            </StoreInfo>
          </BannerContainer>
          <Content marginTop={false}>
            <ProductsWrapper>
              {uniqueCategories.map((category) => {
                return (
                  <div key={category}>
                    <CategoryName>
                      {category.substring(0, 1).toUpperCase() +
                        category.substring(1)}
                    </CategoryName>
                    <ProductsContainer>
                      {products.map((product) => {
                        return (
                          product.category === category && (
                            <ProductCard
                              productData={product}
                              restaurantData={restaurant}
                              key={product._id}
                            />
                          )
                        );
                      })}
                    </ProductsContainer>
                  </div>
                );
              })}
            </ProductsWrapper>
          </Content>
        </>
      ) : (
        <div style={{ marginTop: "117px" }}>
          <RestaurantBannerSkeleton />
          <ProductsContainer>
            {[...Array(8)].map((e, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </ProductsContainer>
        </div>
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

const ProductsWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 75px;
  margin: 30px 0;
  grid-row-gap: 60px;
  margin-bottom: 60px;
`;

const BannerContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 320px;
  background-image: url(${(props) => props.bannerSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  margin-top: 117px;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 320px;
    background: rgba(255, 255, 255, 0);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 66%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  left: 70px;
  top: 175px;
  z-index: 1;
`;

const StoreInfo = styled.span`
  display: flex;
  align-items: baseline;
  position: absolute;
  z-index: 2;
  color: #fff;
  bottom: 20px;
  left: 300px;
`;

const StoreName = styled.span`
  font-size: 35px;
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const StoreHours = styled.span`
  font-size: 16px;
  letter-spacing: -0.04em;
  margin-left: 20px;
`;

const CategoryName = styled.span`
  width: 100%;
  color: var(--primary-color);
  font-size: 30px;
  font-weight: 700;
`;

// export default Restaurant;
export default withAuthenticationRequired(Restaurant, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
