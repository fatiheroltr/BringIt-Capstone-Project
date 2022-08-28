import styled, { keyframes } from "styled-components";

const ProductCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <Skeleton style={{ height: "180px" }} />
      <Skeleton style={{ height: "25px", width: "170px", marginTop: "20px" }} />
      <Skeleton style={{ height: "17px", marginTop: "15px" }} />
      <Skeleton style={{ height: "17px", width: "230px", marginTop: "5px" }} />
      <SkeletonContainer style={{ marginTop: "15px" }}>
        <Skeleton
          style={{
            height: "27px",
            width: "27px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <Skeleton style={{ height: "20px", width: "150px" }} />
      </SkeletonContainer>
      <SkeletonContainer
        style={{ justifyContent: "space-between", marginTop: "24px" }}
      >
        <Skeleton style={{ height: "27px", width: "60px" }} />
        <Skeleton
          style={{
            height: "27px",
            width: "70px",
            borderRadius: "20px",
          }}
        />
        <Skeleton
          style={{
            height: "30px",
            width: "80px",
            borderRadius: "10px",
          }}
        />
      </SkeletonContainer>
    </SkeletonWrapper>
  );
};

const SkeletonWrapper = styled.div`
  width: 267px;
  height: 370px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const loading = keyframes`
to {
    background-position-x: -20%;
  }
`;

const Skeleton = styled.div`
  border-radius: 5px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1.5s ${loading} ease-in-out infinite;
`;

export default ProductCardSkeleton;
