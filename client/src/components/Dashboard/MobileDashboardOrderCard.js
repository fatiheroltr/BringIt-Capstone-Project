import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { GoScreenFull } from "react-icons/go";
import TrackingMap from "../TrackingMap";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import LoadingCircle from "../LoadingCircle";

const MobileDashboardOrderCard = ({ order, delivery }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [jobAccepted, setJobAccepted] = useState(
    order.status !== "Pending" && true
  );
  const [jobAccepting, setJobAccepting] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const handleStatusUpdate = (order) => {
    setJobAccepting(true);
    const statusUpdate = async () => {
      const updateObject = {
        orderId: order._id,
        userEmail: order.email,
        status: "On the way",
      };

      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateObject),
      };
      try {
        const response = await fetch(`/api/update-order-status`, options);
        const result = await response.json();
      } catch (err) {
        console.log("Error", err);
      }
    };
    statusUpdate();
  };

  return (
    <Wrapper key={uuidv4()}>
      <OrderRow style={{ alignItems: "center" }}>
        <div>
          <BoldText>Order #</BoldText>
          <span>{order._id.slice(0, 12)}</span>
        </div>
        <div>
          {!delivery ? (
            <StatusColor orderStatus={order.status}>{order.status}</StatusColor>
          ) : (
            <AcceptButton
              onClick={() => handleStatusUpdate(order)}
              disabled={(jobAccepted || jobAccepting) && true}
            >
              {jobAccepting ? (
                <LoadingCircle circleSize={30} />
              ) : !jobAccepted ? (
                "Accept the job"
              ) : (
                "Accepted"
              )}
            </AcceptButton>
          )}
        </div>
      </OrderRow>
      <OrderRow style={{ flexDirection: "column" }}>
        {order.cart.map((cartItem) => {
          return (
            <CartItemWrapper key={uuidv4()}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <BoldText>{cartItem.name}</BoldText>
                {cartItem.excludedIngredients.length > 0 && (
                  <Extras>
                    <span>Excludes: </span>
                    {cartItem.excludedIngredients.map((excludedItem) => {
                      return <span key={uuidv4()}>{excludedItem.name}</span>;
                    })}
                  </Extras>
                )}
                {cartItem.selectedOptions.length > 0 && (
                  <Extras>
                    <span>Options: </span>
                    {cartItem.selectedOptions.map((selectedOption) => {
                      return <span key={uuidv4()}>{selectedOption.name}</span>;
                    })}
                  </Extras>
                )}
              </div>
              <StoreName>{cartItem.store}</StoreName>
            </CartItemWrapper>
          );
        })}
      </OrderRow>
      <OrderRow
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div style={{ flexDirection: "column" }}>
          <div
            style={{
              justifyContent: "space-between",
            }}
          >
            <div style={{ flexDirection: "column" }}>
              <BoldText>Name:</BoldText>
              <span>{order.name}</span>

              {!delivery ? (
                <div style={{ marginTop: "10px" }}>
                  <BoldText>Total:</BoldText>
                  <span>${order.total}</span>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <BoldText>Earning:</BoldText>
                  <span>${(order.fee + order.tip).toFixed(2)}</span>
                </div>
              )}
            </div>

            <MapOverlay
              onClick={() => (order.status !== "Pending" || delivery) && open()}
              status={order.status}
              delivery={delivery}
            >
              <Overlay>
                <GoScreenFull />
              </Overlay>
              <TrackingMap
                destinationLatitude={order.lat}
                destinationLongitude={order.lng}
              />
              <DialogOverlay
                style={{
                  background: "hsla(0, 0, 0, 0.7)",
                  zIndex: "9999",
                }}
                isOpen={showDialog}
                onDismiss={close}
              >
                <StyledDialogContent aria-label={order.name}>
                  <DialogCloseButton className="close-button" onClick={close}>
                    X
                  </DialogCloseButton>
                  <MapContainer>
                    <TrackingMap
                      destinationLatitude={order.lat}
                      destinationLongitude={order.lng}
                    />
                  </MapContainer>
                </StyledDialogContent>
              </DialogOverlay>
            </MapOverlay>
          </div>
        </div>

        <div style={{ flexDirection: "column" }}>
          <BoldText>Instructions :</BoldText>
          <span>{order.instructions}</span>
        </div>
      </OrderRow>
      <OrderRow>
        <div>
          <BoldText>Date:</BoldText>
          <span>{order.date}</span>
        </div>
      </OrderRow>
    </Wrapper>
  );
};

const AcceptButton = styled.button`
  font-size: 14px;
  color: #fff;
  font-weight: 700;
  background-color: var(--primary-color);
  border-radius: 10px;
  border: 2px solid var(--primary-color);
  padding: 7px;
  width: 120px;
  height: 34px;

  cursor: pointer;
  align-self: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #fff;
    color: var(--primary-color);
  }
`;

const statusAnim = keyframes`
 0% { opacity: 1 }
 50% { opacity: 0 }
 100% { opacity: 1; }
`;

const StatusColor = styled.span`
  font-weight: 700;
  color: #fff;
  background-color: ${(props) =>
    props.orderStatus === "Pending" ? "#B12512" : "#31A309"};
  padding: 3px 7px;
  border-radius: 7px;
  animation-name: ${(props) => props.orderStatus === "Pending" && statusAnim};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const DialogCloseButton = styled.button`
  position: absolute;
  top: -7px;
  right: -7px;
  width: 30px;
  height: 30px;
  border: none;
  padding: 7px;
  border-radius: 50%;
  font-weight: 700;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: var(--light-color);
  }

  &:focus {
    outline: none;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  box-shadow: 0px 10px 50px hsla(0, 0%, 0%, 0.33);
  width: 90%;
  border-radius: 20px;
  padding: 17px;
  position: relative;
  margin-top: 30%;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 99;
  color: #fff;
  font-size: 45px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapOverlay = styled.div`
  display: relative;
  width: 125px;
  height: 80px;
  cursor: ${(props) =>
    props.status === "Pending" ? "not-allowed" : "pointer"};
  filter: ${(props) =>
    props.status === "Pending" && !props.delivery
      ? "grayscale(100%)"
      : "grayscale(0%)"};
  opacity: ${(props) =>
    props.status === "Pending" && !props.delivery ? ".5" : "1"};

  &:hover {
    cursor: ${(props) =>
      props.status === "Pending" && !props.delivery
        ? "not-allowed"
        : "pointer"};
    ${Overlay} {
      opacity: ${(props) =>
        props.status !== "Pending" || props.jobAccepted || !props.jobAccepted
          ? "1"
          : "0"};
    }
  }
`;

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const Extras = styled.div`
  font-size: 14px;
  font-style: italic;
`;

const StoreName = styled.span`
  font-size: 14px;
  color: var(--teal-color);
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    gap: 7px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  color: var(--primary-color);
  font-size: 16px;

  ${OrderRow}:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
    padding: 20px 0;
  }

  ${OrderRow}:first-child {
    padding-top: 0px;
  }

  ${OrderRow}:last-child {
    padding-top: 20px;
  }
`;

export default MobileDashboardOrderCard;
