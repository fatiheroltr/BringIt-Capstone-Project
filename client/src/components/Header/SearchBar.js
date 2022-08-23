import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = () => {
  return (
    <Wrapper>
      <SearchIcon />
      <Search placeholder={"what are you craving right now?"} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 520px;
  margin-right: 40px;
`;

const SearchIcon = styled(BiSearchAlt2)`
  position: absolute;
  width: 27px;
  height: 27px;
  top: 15px;
  left: 20px;
  color: var(--primary-color);
  opacity: 0.3;
`;

const Search = styled.input`
  box-sizing: border-box;
  height: 55px;
  width: 100%;
  background: var(--light-color);
  border-radius: 125px;
  border: none;
  padding-left: 55px;
  padding-right: 30px;
  font-size: 20px;
  color: var(--primary-color);

  &:focus {
    outline: none;
  }

  &::placeholder {
    letter-spacing: -0.04em;
    font-size: 20px;
    color: var(--primary-color);
    opacity: 0.2;
  }
`;

export default SearchBar;
