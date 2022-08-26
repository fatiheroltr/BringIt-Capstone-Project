import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import styled from "styled-components";

const CategoryResults = () => {
  const { category } = useParams();
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
      <Content>
        {products ? (
          products.map((product) => {
            return <ProductCard productData={product} key={product._id} />;
          })
        ) : (
          <span>Loading...</span>
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

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 75px;
  margin-bottom: 100px;
  /* grid-row-gap: 30px; */
  /* margin-bottom: 60px; */
`;

export default CategoryResults;
