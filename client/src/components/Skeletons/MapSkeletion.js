import styled, { keyframes } from "styled-components";

const MapSkeleton = () => {
  return <Skeleton style={{ height: "250px", width: "100%" }} />;
};

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 42px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
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

export default MapSkeleton;
