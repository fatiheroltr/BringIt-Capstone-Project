import styled, { keyframes } from "styled-components";

const CheckoutItemSkeleton = () => {
  return (
    <>
      <SkeletonWrapper>
        <SkeletonContainer>
          <Skeleton
            style={{
              height: "66px",
              width: "100px",
              marginRight: "20px",
            }}
          />
          <Skeleton style={{ height: "22px", width: "240px" }} />
        </SkeletonContainer>
        <Skeleton style={{ height: "30px", width: "45px" }} />
        <Skeleton style={{ height: "30px", width: "80px" }} />
      </SkeletonWrapper>
      <SkeletonWrapper>
        <SkeletonContainer>
          <Skeleton
            style={{
              height: "66px",
              width: "100px",
              marginRight: "20px",
            }}
          />
          <Skeleton style={{ height: "22px", width: "240px" }} />
        </SkeletonContainer>
        <Skeleton style={{ height: "30px", width: "45px" }} />
        <Skeleton style={{ height: "30px", width: "80px" }} />
      </SkeletonWrapper>
    </>
  );
};

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
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

export default CheckoutItemSkeleton;
