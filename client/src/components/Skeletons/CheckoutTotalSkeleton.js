import styled, { keyframes } from "styled-components";

const CheckoutTotalSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonContainer>
        <Skeleton
          style={{
            height: "20px",
            width: "80px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "45px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "100px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "100px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "45px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "45px",
          }}
        />
      </SkeletonContainer>
      <SkeletonContainer>
        <Skeleton
          style={{
            height: "20px",
            width: "80px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "45px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "100px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "100px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "45px",
          }}
        />
        <Skeleton
          style={{
            height: "20px",
            width: "45px",
          }}
        />
      </SkeletonContainer>
    </SkeletonWrapper>
  );
};

const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 80px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-items: flex-end;
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

export default CheckoutTotalSkeleton;
