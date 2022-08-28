import styled, { keyframes } from "styled-components";

const RestaurantBannerSkeleton = () => {
  return (
    <Skeleton
      style={{
        maxWidth: "1440px",
        width: "100%",
        height: "320px",
        background: "#F7F7F7",
        position: "relative",
        marginBottom: "110px",
      }}
    >
      <Skeleton
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          left: "70px",
          top: "175px",
          zIndex: "1",
        }}
      />
      <SkeletonContainer
        style={{
          display: "flex",
          alignItems: "baseline",
          position: "absolute",
          zIndex: "2",
          bottom: "20px",
          left: "300px",
        }}
      >
        <Skeleton style={{ width: "215px", height: "35px" }} />
        <Skeleton
          style={{ marginLeft: "20px", width: "120px", height: "16px" }}
        />
      </SkeletonContainer>
    </Skeleton>
  );
};

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

export default RestaurantBannerSkeleton;
