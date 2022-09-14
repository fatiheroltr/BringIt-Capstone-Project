import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { BiUser, BiLogOut } from "react-icons/bi";
import { TbClipboardList } from "react-icons/tb";
import { GoSettings } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import DashboardOrderCard from "../components/Dashboard/DashboardOrderCard";
import DashboardOrderCardSkeleton from "../components/Skeletons/DashboardOrderCardSkeleton";

const Dashboard = () => {
  const { user, logout } = useAuth0();
  const [orders, setOrders] = useState();
  const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);
  const [activeMenu, setActiveMenu] = useState("orders");
  const [location, setLocation] = useState();
  // const [reload, setReload] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const handleClick = (id) => {
    if (id === "logout") {
      logout();
    }
    setActiveMenu(id);
  };

  // const reFetchForUpdates = async () => {
  //   try {
  //     const response = await fetch(`/api/reload/${user.email}`);
  //     const result = await response.json();
  //     // console.log("result: ", result.reload);
  //     setReload(result ? true : false);
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/get-orders-by-email/${user.email}`);
        const result = await response.json();
        setOrders(result.data);
        setIsOrdersLoaded(true);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   reFetchForUpdates();
  // }, []);

  // useEffect(() => {
  //   fetchOrders();
  //   // const interval = setInterval(() => {
  //   //   fetchOrders();
  //   // }, 6000);
  //   // return () => clearInterval(interval);
  // }, [reload, setReload]);

  return (
    <Section key={uuidv4()}>
      <Header navigation={true} />
      <Content marginTop={true}>
        <Wrapper>
          <ProfileContainer>
            <ProfilePic src={user.picture} referrerPolicy="no-referrer" />
            <ProfileMenuContainer>
              <ProfileRow
                id="profile"
                onClick={(ev) => handleClick(ev.target.id)}
                activeMenu={activeMenu}
              >
                <Icon>
                  <BiUser />
                </Icon>
                Profile
              </ProfileRow>
              <ProfileRow
                id="orders"
                onClick={(ev) => handleClick(ev.target.id)}
                activeMenu={activeMenu}
              >
                <Icon>
                  <TbClipboardList />
                </Icon>
                Orders
              </ProfileRow>
              <ProfileRow
                id="settings"
                onClick={(ev) => handleClick(ev.target.id)}
                activeMenu={activeMenu}
              >
                <Icon>
                  <GoSettings />
                </Icon>
                Settings
              </ProfileRow>
              <ProfileRow
                id="logout"
                onClick={(ev) => handleClick(ev.target.id)}
                activeMenu={activeMenu}
              >
                <Icon>
                  <BiLogOut />
                </Icon>
                Log out
              </ProfileRow>
            </ProfileMenuContainer>
          </ProfileContainer>
          <ContentContainer>
            {activeMenu === "orders" &&
              orders &&
              orders.length > 0 &&
              orders.map((order) => {
                return <DashboardOrderCard key={order._id} order={order} />;
              })}
            {activeMenu === "orders" && !isOrdersLoaded && (
              <DashboardOrderCardSkeleton />
            )}
            {activeMenu === "orders" && isOrdersLoaded && orders.length < 1 && (
              <EmptyField>No order? Aren't you hungry?</EmptyField>
            )}
            {activeMenu === "profile" && (
              <EmptyField>
                Profile details will be here in three years
              </EmptyField>
            )}
            {activeMenu === "settings" && (
              <EmptyField>Settings will be here. I mean maybe</EmptyField>
            )}
          </ContentContainer>
        </Wrapper>
      </Content>
      <Footer />
    </Section>
  );
};

const EmptyField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-color);
`;

const Icon = styled.span`
  font-size: 27px;
`;

const ProfileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 15px;
`;

const ProfileRow = styled.button`
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  padding-left: 35px;

  background-color: ${(props) => props.activeMenu === props.id && "#fff"};
  margin-left: ${(props) => props.activeMenu === props.id && "20px"};
  padding-left: ${(props) => props.activeMenu === props.id && "15px"};
  border-radius: ${(props) =>
    props.activeMenu === props.id && "40px 0px 0px 40px"};
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -90px;
  margin-left: auto;
  margin-right: auto;
`;

const ProfileContainer = styled.div`
  width: 250px;
  background-color: var(--light-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 40px 0 20px 0;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px);
  gap: 25px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 70px 0;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  gap: 30px;
`;

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
