import { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../context/UserContext";
import { TbPaperBag } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { mobile } from "../utils";
import MobileDashboardOrderCard from "../components/Dashboard/MobileDashboardOrderCard";
import MobileDashboardOrderCardSkeleton from "../components/Skeletons/MobileDashboardOrderCardSkeleton";
import Redirect from "../components/Redirect";

const Dashboard = () => {
  const { user, logout } = useAuth0();
  const { currentUser, setUser, isUserDeliverer } = useContext(UserContext);
  const [orders, setOrders] = useState();
  const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);
  const [jobs, setJobs] = useState();
  const [isJobsLoaded, setIsJobsLoaded] = useState(false);
  const [activeMenu, setActiveMenu] = useState("orders");
  const [location, setLocation] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [isMenuOpen, setIsOpenMenu] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const handleClick = (id) => {
    if (id === "logout") {
      logout();
    }
    setActiveMenu(id);
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch(`/api/get-orders`);
      const result = await response.json();
      setJobs(result.data);
      setIsJobsLoaded(true);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `/api/get-orders-by-email/${currentUser.email}`
      );
      const result = await response.json();
      setOrders(result.data);
      setIsOrdersLoaded(true);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    currentUser && fetchOrders();
    fetchJobs();
    const interval = setInterval(() => {
      fetchOrders();
      fetchJobs();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <Section key={uuidv4()}>
      <Header navigation={true} />
      <Content marginTop={true}>
        <DesktopWrapper>
          <ProfileContainer>
            <ProfilePic
              src={currentUser && currentUser.picture}
              referrerPolicy="no-referrer"
            />
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
              {isUserDeliverer && (
                <ProfileRow
                  id="delivery"
                  onClick={(ev) => handleClick(ev.target.id)}
                  activeMenu={activeMenu}
                >
                  <Icon>
                    <TbClipboardList />
                  </Icon>
                  Deliveries
                </ProfileRow>
              )}
              <ProfileRow
                id="orders"
                onClick={(ev) => handleClick(ev.target.id)}
                activeMenu={activeMenu}
              >
                <Icon>
                  <TbPaperBag />
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
                return (
                  <DashboardOrderCard
                    key={order._id}
                    order={order}
                    delivery={false}
                  />
                );
              })}
            {activeMenu === "orders" && !isOrdersLoaded && (
              <DashboardOrderCardSkeleton />
            )}
            {activeMenu === "orders" && isOrdersLoaded && orders.length < 1 && (
              <EmptyField>No order? Aren't you hungry?</EmptyField>
            )}

            {activeMenu === "delivery" &&
              jobs &&
              jobs.length > 0 &&
              jobs.map((job) => {
                return (
                  <DashboardOrderCard
                    key={job._id}
                    order={job}
                    delivery={isUserDeliverer}
                  />
                );
              })}

            {activeMenu === "profile" && (
              <EmptyField>
                Profile details will be here in three years
              </EmptyField>
            )}
            {activeMenu === "settings" && (
              <EmptyField>Settings will be here. I mean maybe</EmptyField>
            )}
          </ContentContainer>
        </DesktopWrapper>
        <MobileWrapper>
          <ProfileMobileHeader>
            <div>
              <ProfilePic
                src={currentUser && currentUser.picture}
                referrerPolicy="no-referrer"
              />
              <ActiveMenuTitle>{activeMenu}</ActiveMenuTitle>
            </div>
            <MenuButton onClick={() => setIsOpenMenu(!isMenuOpen)}>
              <GiHamburgerMenu />
            </MenuButton>
          </ProfileMobileHeader>
          {isMenuOpen && (
            <ProfileMenuContainer>
              <ProfileRow
                id="profile"
                onClick={(ev) => {
                  handleClick(ev.target.id);
                  setIsOpenMenu(false);
                }}
                activeMenu={activeMenu}
              >
                <Icon>
                  <BiUser />
                </Icon>
                Profile
              </ProfileRow>
              {isUserDeliverer && (
                <ProfileRow
                  id="deliveries"
                  onClick={(ev) => {
                    handleClick(ev.target.id);
                    setIsOpenMenu(false);
                  }}
                  activeMenu={activeMenu}
                >
                  <Icon>
                    <TbClipboardList />
                  </Icon>
                  Deliveries
                </ProfileRow>
              )}
              <ProfileRow
                id="orders"
                onClick={(ev) => {
                  handleClick(ev.target.id);
                  setIsOpenMenu(false);
                }}
                activeMenu={activeMenu}
              >
                <Icon>
                  <TbPaperBag />
                </Icon>
                Orders
              </ProfileRow>
              <ProfileRow
                id="settings"
                onClick={(ev) => {
                  handleClick(ev.target.id);
                  setIsOpenMenu(false);
                }}
                activeMenu={activeMenu}
              >
                <Icon>
                  <GoSettings />
                </Icon>
                Settings
              </ProfileRow>
              <ProfileRow
                id="logout"
                onClick={(ev) => {
                  handleClick(ev.target.id);
                  setIsOpenMenu(false);
                }}
                activeMenu={activeMenu}
              >
                <Icon>
                  <BiLogOut />
                </Icon>
                Log out
              </ProfileRow>
            </ProfileMenuContainer>
          )}
          <ContentContainer>
            {activeMenu === "orders" &&
              orders &&
              orders.length > 0 &&
              orders.map((order) => {
                return (
                  <MobileDashboardOrderCard
                    key={order._id}
                    order={order}
                    delivery={false}
                  />
                );
              })}
            {activeMenu === "orders" && !isOrdersLoaded && (
              <MobileDashboardOrderCardSkeleton />
            )}
            {activeMenu === "orders" && isOrdersLoaded && orders.length < 1 && (
              <EmptyField>No order? Aren't you hungry?</EmptyField>
            )}

            {activeMenu === "deliveries" &&
              jobs &&
              jobs.length > 0 &&
              jobs.map((job) => {
                return (
                  <MobileDashboardOrderCard
                    key={job._id}
                    order={job}
                    delivery={isUserDeliverer}
                  />
                );
              })}

            {activeMenu === "profile" && (
              <EmptyField>
                Profile details will be here in three years
              </EmptyField>
            )}
            {activeMenu === "settings" && (
              <EmptyField>Settings will be here. I mean maybe</EmptyField>
            )}
          </ContentContainer>
        </MobileWrapper>
      </Content>
      <Footer />
    </Section>
  );
};

const MenuButton = styled.button`
  font-size: 22px;
  font-weight: 700;
  background: none;
  border: none;
`;

const ActiveMenuTitle = styled.span`
  color: var(--primary-color);
  font-weight: 700;
  font-size: 22px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const ProfileMobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;

const EmptyField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-color);
  ${mobile({ textAlign: "center", height: "calc(100vh - 300px)" })};
`;

const Icon = styled.span`
  font-size: 27px;
`;

const ProfileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;

  ${mobile({
    margin: "10px 0",
    width: "156px",
    padding: "10px 0",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    backgroundColor: "var(--light-color)",
    position: "absolute",
    right: "20px",
    top: "40px",
    boxShadow: "-14px 16px 41px -12px rgba(0, 0, 0, 0.35)",
    zIndex: "1",
  })};
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

  ${mobile({
    fontSize: "18px",
    padding: "2px 0 0 20px",
    margin: "0",
    borderRadius: "0",
  })};
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  ${mobile({ width: "54px", height: "54px", margin: "0" })};
  border-radius: 50%;
  margin-top: -90px;
  margin-left: auto;
  margin-right: auto;
`;

const ProfileContainer = styled.div`
  width: 250px;
  ${mobile({
    width: "156px",
    padding: "0",
    border: "1px solid var(--border-color)",
  })};
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
  ${mobile({ width: "100%", gap: "0" })};
  gap: 25px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DesktopWrapper = styled.div`
  display: flex;
  margin: 70px 0;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  gap: 30px;
  ${mobile({ display: "none" })};
`;

const MobileWrapper = styled.div`
  width: 100vw;
  padding: 0 30px;
  display: none;
  ${mobile({ display: "block" })};
`;

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Redirect />,
});
