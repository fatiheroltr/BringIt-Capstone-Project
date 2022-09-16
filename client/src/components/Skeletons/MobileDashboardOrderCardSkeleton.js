import styled, { keyframes } from "styled-components";

const MobileDashboardOrderCardSkeleton = () => {
  return (
    <>
      <SkeletonWrapper>
        <OrderRow>
          <Skeleton
            style={{
              height: "20px",
              width: "190px",
            }}
          />
          <Skeleton
            style={{
              height: "20px",
              width: "100px",
            }}
          />
        </OrderRow>
        <OrderRow style={{ flexDirection: "column", gap: "15px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Skeleton
              style={{
                height: "20px",
                width: "190px",
              }}
            />
            <Skeleton
              style={{
                height: "20px",
                width: "100px",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Skeleton
              style={{
                height: "20px",
                width: "190px",
              }}
            />
            <Skeleton
              style={{
                height: "20px",
                width: "100px",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Skeleton
              style={{
                height: "20px",
                width: "190px",
              }}
            />
            <Skeleton
              style={{
                height: "20px",
                width: "100px",
              }}
            />
          </div>
        </OrderRow>
        <OrderRow style={{ flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Skeleton
                style={{
                  height: "20px",
                  width: "50px",
                }}
              />
              <Skeleton
                style={{
                  height: "20px",
                  width: "185px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                <Skeleton
                  style={{
                    height: "20px",
                    width: "40px",
                  }}
                />
                <Skeleton
                  style={{
                    height: "20px",
                    width: "65px",
                  }}
                />
              </div>
            </div>
            <div>
              <Skeleton
                style={{
                  height: "80px",
                  width: "125px",
                }}
              />
            </div>
          </div>
          <Skeleton
            style={{
              height: "20px",
              width: "120px",
            }}
          />
          <Skeleton
            style={{
              height: "20px",
              width: "100%",
              marginTop: "-20px",
            }}
          />
          <Skeleton
            style={{
              height: "20px",
              width: "50%",
              marginTop: "-25px",
            }}
          />
        </OrderRow>
        <OrderRow>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "15px",
            }}
          >
            <Skeleton
              style={{
                height: "20px",
                width: "40px",
              }}
            />
            <Skeleton
              style={{
                height: "20px",
                width: "65px",
              }}
            />
          </div>
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
  padding-top: 20px;
`;

const SkeletonWrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin-top: 20px;

  ${OrderRow}:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
  }

  ${OrderRow}:last-child {
    padding-top: 20px;
  }

  ${OrderRow}:first-child {
    padding-top: 0px;
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

export default MobileDashboardOrderCardSkeleton;
