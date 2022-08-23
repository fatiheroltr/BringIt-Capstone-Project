import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Wrapper>
      <SearchBar />
      <NavIcons />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Navigation;
