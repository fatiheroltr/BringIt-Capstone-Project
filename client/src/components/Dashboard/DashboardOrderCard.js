import { v4 as uuidv4 } from "uuid";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import TrackingMap from "../TrackingMap";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { GoScreenFull } from "react-icons/go";
import LoadingCircle from "../LoadingCircle";

const DashboardOrderCard = ({ order, delivery }) => {
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
    <OrderContainer key={uuidv4()}>
      <OrderRow>
        <InnerRowGroup
          style={{ display: "flex", gap: "30px", alignItems: "center" }}
        >
          <span>
            <BoldText>Order # </BoldText>
            <span>{order._id.slice(0, 12)}</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            Status:{" "}
            {!delivery ? (
              <StatusColor orderStatus={order.status}>
                {order.status}
              </StatusColor>
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
          </span>
        </InnerRowGroup>
        <InnerRowGroup
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span>
            {!delivery ? (
              <>
                <BoldText>Total:</BoldText> ${order.total}
              </>
            ) : (
              <>
                <BoldText>Earning:</BoldText> $
                {(order.fee + order.tip).toFixed(2)}
              </>
            )}
          </span>
          <span>
            <BoldText>Date:</BoldText> {order.date}
          </span>
        </InnerRowGroup>
      </OrderRow>
      <OrderRow>
        <RowGroup>
          <InnerRowGroup>
            {order.cart.map((cartItem) => {
              return (
                <ItemWrapper key={uuidv4()}>
                  <Item>
                    <BoldText>{cartItem.name}</BoldText>
                    {cartItem.excludedIngredients.length > 0 && (
                      <ExtrasWrapper>
                        <ExtrasContainer>
                          <Extras style={{ marginRight: "7px" }}>
                            Excludes:
                          </Extras>
                          {cartItem.excludedIngredients.map((excludedItem) => {
                            return (
                              <Extras key={uuidv4()}>
                                <span
                                  style={{
                                    marginRight: "5px",
                                  }}
                                >
                                  {cartItem.excludedIngredients.indexOf(
                                    excludedItem
                                  ) ===
                                  cartItem.excludedIngredients.length - 1
                                    ? excludedItem.name
                                    : excludedItem.name + ", "}
                                </span>
                              </Extras>
                            );
                          })}
                        </ExtrasContainer>
                      </ExtrasWrapper>
                    )}

                    {cartItem.selectedOptions.length > 0 && (
                      <ExtrasContainer>
                        <Extras style={{ marginRight: "7px" }}>Options:</Extras>
                        {cartItem.selectedOptions.map((selectedOption) => {
                          return (
                            <Extras key={uuidv4()}>
                              <span
                                style={{
                                  marginRight: "5px",
                                }}
                              >
                                {cartItem.selectedOptions.indexOf(
                                  selectedOption
                                ) ===
                                cartItem.selectedOptions.length - 1
                                  ? selectedOption.name
                                  : selectedOption.name + ", "}
                              </span>
                            </Extras>
                          );
                        })}
                      </ExtrasContainer>
                    )}
                  </Item>
                  <Item>
                    <StoreName>{cartItem.store}</StoreName>
                  </Item>
                </ItemWrapper>
              );
            })}
          </InnerRowGroup>
        </RowGroup>
        <RowGroup style={{ flexDirection: "column", gap: "5px" }}>
          <InnerRowGroup>
            <BoldText>Name:</BoldText>
            <Item style={{ marginTop: "7px", fontSize: "16px" }}>
              {order.name}
            </Item>
          </InnerRowGroup>
          <InnerRowGroup>
            <BoldText>Instructions:</BoldText>
            <Item style={{ marginTop: "7px", fontSize: "16px" }}>
              {order.instructions}
            </Item>
          </InnerRowGroup>
        </RowGroup>
        <RowGroup>
          <InnerRowGroup>
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
          </InnerRowGroup>
        </RowGroup>
      </OrderRow>
    </OrderContainer>
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
  width: 610px;
  border-radius: 20px;
  padding: 17px;
  position: relative;
  margin-top: 3%;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 255px;
  height: 113px;
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
  width: 100%;
  height: 100%;
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
      opacity: ${(props) => (props.status === "Pending" ? "0" : "1")};
    }
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

const StoreName = styled.span`
  font-size: 14px;
  color: var(--teal-color);
`;

const Item = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
`;

const InnerRowGroup = styled.div`
  width: 100%;
  height: 100%;
`;

const ExtrasContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 10px; */
  margin: 5px 0;
`;

const ExtrasWrapper = styled.div`
  margin-top: 7px;
`;

const Extras = styled.div`
  /* margin: 5px 0; */
  font-size: 14px;
  font-style: italic;
`;

const RowGroup = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  /* width: 350px; */
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

const BoldText = styled.span`
  font-weight: 700;
`;

const OrderContainer = styled.div`
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

export default DashboardOrderCard;
