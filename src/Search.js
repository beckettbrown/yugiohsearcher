import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardDetails from './CardDetails';
import Header from './Header';
import './styles/CardStyles.css';

function Search({ allCards }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    const filteredResults = allCards.filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.desc.toLowerCase().includes(searchTerm.toLowerCase()) 
      // ADD IN ARCHETYPE SEARCH
    );
    setSearchResults(filteredResults);
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const goToInteractionPage = () => {
    navigate('/interaction', { state: { selectedCard, allCards } });
  };

  return (
    <div>
      <Header />
      <br></br>
      <form onSubmit={handleSearch} className="filter-button-container">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search for a card" 
          className="search-input" // Add a class for the input
        />
        <button className='filter-button' type="submit">Search</button>
      </form>
      <div className="button-center-container">
        <button 
          className={`filter-button ${selectedCard ? 'active' : ''}`} 
          onClick={goToInteractionPage} 
          disabled={!selectedCard}>
          Go to Interaction Page
        </button>
      </div>
<br></br>
<br></br>
      <div className='cards-grid'>
        {searchResults.map(card => (
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
