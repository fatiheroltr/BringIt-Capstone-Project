import styled, { keyframes } from "styled-components";

const DashboardOrderCardSkeleton = () => {
  return (
    <>
      <SkeletonWrapper>
        <OrderRow>
          <RowGroup style={{ border: "none" }}>
            <SkeletonContainer style={{ gap: "30px" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
          <RowGroup>
            <SkeletonContainer
              style={{ gap: "30px", justifyContent: "flex-end" }}
            >
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "200px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
        </OrderRow>
        <OrderRow>
          <RowGroup style={{ flexDirection: "column", gap: "20px", flex: "2" }}>
            <SkeletonContainer style={{ justifyContent: "space-between" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
            </SkeletonContainer>
            <SkeletonContainer style={{ justifyContent: "space-between" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
            </SkeletonContainer>
            <SkeletonContainer style={{ justifyContent: "space-between" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
          <RowGroup>
            <SkeletonContainer style={{ flexDirection: "column", gap: "20px" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "70px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "190px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
          <RowGroup>
            <SkeletonContainer style={{ flexDirection: "column", gap: "20px" }}>
              <Skeleton
                style={{
                  height: "100px",
                  width: "250px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
        </OrderRow>
      </SkeletonWrapper>
      <SkeletonWrapper>
        <OrderRow>
          <RowGroup style={{ border: "none" }}>
            <SkeletonContainer style={{ gap: "30px" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
          <RowGroup>
            <SkeletonContainer
              style={{ gap: "30px", justifyContent: "flex-end" }}
            >
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "200px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
        </OrderRow>
        <OrderRow>
          <RowGroup style={{ flexDirection: "column", gap: "20px", flex: "2" }}>
            <SkeletonContainer style={{ justifyContent: "space-between" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
            </SkeletonContainer>
            <SkeletonContainer style={{ justifyContent: "space-between" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
            </SkeletonContainer>
            <SkeletonContainer style={{ justifyContent: "space-between" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "160px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "100px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
          <RowGroup>
            <SkeletonContainer style={{ flexDirection: "column", gap: "20px" }}>
              <Skeleton
                style={{
                  height: "20px",
                  width: "70px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "190px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
          <RowGroup>
            <SkeletonContainer style={{ flexDirection: "column", gap: "20px" }}>
              <Skeleton
                style={{
                  height: "100px",
                  width: "250px",
                }}
              />
            </SkeletonContainer>
          </RowGroup>
        </OrderRow>
      </SkeletonWrapper>
    </>
  );
};

const RowGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  border-right: 1px solid var(--border-color);
  padding-right: 30px;
`;

const OrderRow = styled.div`
  color: var(--primary-color);
  font-style: 20px;
  display: flex;
  justify-content: space-between;
  gap: 30px;

  ${RowGroup}:last-child {
    border: none;
    padding: 0;
  }
`;

const SkeletonWrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;

  ${OrderRow}:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
  }

  ${OrderRow}:last-child {
    padding-top: 20px;
  }
`;

const SkeletonContainer = styled.div`
  width: 100%;
  display: flex;
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

export default DashboardOrderCardSkeleton;
