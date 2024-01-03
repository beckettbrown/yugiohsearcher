import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDetails from "./CardDetails";
import Header from "./Header";
import "./styles/CardStyles.css";

function Search({ allCards }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = allCards.filter(
      (card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      const filteredSuggestions = allCards
        .map((card) => card.name)
        .filter((name) => name.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (name) => {
    setSearchTerm(name); // Update the search term with the selected suggestion
    setSuggestions([]); // Clear the suggestions
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const goToInteractionPage = () => {
    if (selectedCard) {
      navigate("/interaction", { state: { selectedCard, allCards } });
    }
  };

  return (
    <div>
      <Header />
      <br></br>
      <form onSubmit={handleSearch} className="filter-button-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a card"
          className="search-input"
        />
        <button className="filter-button" type="submit">
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((name, index) => (
            <li key={index} onClick={() => selectSuggestion(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
      <div className="button-center-container">
        <button
          className={`filter-button ${selectedCard ? "active" : ""}`}
          onClick={goToInteractionPage}
          disabled={!selectedCard}
        >
          Go to Interaction Page
        </button>
      </div>
      <div className="cards-grid">
        {searchResults.map((card) => (
          <CardDetails
            key={card.id}
            card={card}
            isSelected={selectedCard && card.id === selectedCard.id}
            handleSelectCard={handleSelectCard}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
