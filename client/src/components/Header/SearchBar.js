import { useContext, useState } from "react";
import styled from "styled-components";
import { ProductsContext } from "../../context/ProductsContext";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { products, isProductsLoaded } = useContext(ProductsContext);
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState();
  const navigate = useNavigate();

  const matchFormatter = (title) => {
    const firstHalf = title.slice(
      0,
      title.toUpperCase().indexOf(inputValue.toUpperCase()) + inputValue.length
    );
    const secondHalf = title.slice(
      inputValue.length + title.toUpperCase().indexOf(inputValue.toUpperCase())
    );
    return (
      <span>
        {firstHalf}
        <Prediction>{secondHalf}</Prediction>
      </span>
    );
  };

  const filteredResults =
    isProductsLoaded &&
    products.filter((product) =>
      product.name.toUpperCase().includes(inputValue.toUpperCase())
    );

  const scrollIntoView = (product) => {
    const element = document.getElementById(product);
    element.scrollIntoView();
  };

  const handleSelect = (selectedTitle) => {
    navigate(`/products/${selectedTitle}`, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <Wrapper>
        <SearchIcon />
        <Input
          type="text"
          value={inputValue}
          onChange={(ev) => {
            setInputValue(ev.target.value);
            setIsSuggestionsOpen(true);
            if (filteredResults.length > 0) {
              setSelectedTitle(Object.values(filteredResults)[0]._id);
            }
          }}
          onKeyDown={(ev) => {
            switch (ev.code) {
              case "Enter": {
                handleSelect(selectedTitle);
                setIsSuggestionsOpen(false);
                setInputValue("");
                return;
              }
              case "ArrowUp": {
                // If user not reached to the top of the list yet
                if (selectedSuggestionIndex !== 0) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                  setSelectedTitle(
                    filteredResults[selectedSuggestionIndex - 1]._id
                  );
                  scrollIntoView(selectedSuggestionIndex - 1);
                }
                // If user tries to pass the top item of the list
                if (selectedSuggestionIndex < 0) {
                  setSelectedSuggestionIndex(0);
                  setSelectedTitle(
                    filteredResults[selectedSuggestionIndex]._id
                  );
                }
                return;
              }
              case "ArrowDown": {
                // If user not reached to the end of the list yet
                if (selectedSuggestionIndex !== filteredResults.length - 1) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                  setSelectedTitle(
                    filteredResults[selectedSuggestionIndex + 1]._id
                  );
                  scrollIntoView(selectedSuggestionIndex + 1);
                }
                // If user tries to pass the last item of the list
                if (selectedSuggestionIndex > filteredResults.length - 1) {
                  setSelectedSuggestionIndex(filteredResults.length - 1);
                  setSelectedTitle(
                    filteredResults[selectedSuggestionIndex]._id
                  );
                }
                return;
              }
              case "Escape": {
                setIsSuggestionsOpen(false);
                setInputValue("");
                return;
              }
            }
          }}
          placeholder={"what are you craving right now?"}
        />
      </Wrapper>
      {inputValue.length > 1 &&
      filteredResults.length > 0 &&
      isSuggestionsOpen ? (
        <List>
          {filteredResults.map((item, index) => {
            return (
              <Suggestion
                key={index}
                onClick={() => {
                  handleSelect(item._id);
                }}
                selected={index === selectedSuggestionIndex}
                onMouseEnter={() => setSelectedSuggestionIndex(index)}
                id={index}
              >
                {matchFormatter(item.name)}
                <Category>
                  in{" "}
                  <Category colored>
                    {item.category.substring(0, 1).toUpperCase() +
                      item.category.substring(1)}
                  </Category>
                </Category>
              </Suggestion>
            );
          })}
        </List>
      ) : (
        ""
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
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

const Input = styled.input`
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

const Clear = styled.button`
  font-size: 1.3em;
  width: 100px;
  height: 50px;
  color: #fff;
  background-color: #678efe;
  border: 1px solid #275efe;
  border-radius: 6px;
  margin: 2px;
  cursor: pointer;

  &:hover {
    background-color: #275efe;
  }

  &:active {
    background-color: #678efe;
  }
`;

const List = styled.ul`
  position: absolute;
  top: 55px;
  left: 34px;
  width: 450px;
  max-height: 350px;
  overflow-y: auto;
  text-align: left;
  box-shadow: 0px 7px 17px -7px rgba(0, 0, 0, 0.45);
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
`;

const Suggestion = styled.li`
  line-height: 24px;
  display: block;
  padding: 10px;
  background-color: ${(props) =>
    props.selected ? "var(--light-color)" : "transparent"};
  &:hover {
    cursor: pointer;
  }
`;

const Category = styled.span`
  color: grey;
  font-style: italic;
  font-size: 0.9em;
  margin-left: ${(props) => (props.colored ? "0" : "5px")};
  color: ${(props) => (props.colored ? "var(--teal-color)" : "")};
`;

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  margin-right: 40px;
`;

const Prediction = styled.span`
  font-weight: 700;
`;

export default SearchBar;
