import React, { useState } from 'react';
import CardDetails from '../CardDetails';
import '../styles/CardStyles.css';

const MONSTER_TYPES = [
  'Link Monster', 
  'Ritual Monster', 
  'Fusion Monster', 
  'XYZ Monster', 
  'Pendulum Monster'
];

function AdvancedInteractionFinder({ selectedCard, allCards }) {
  const [selectedType, setSelectedType] = useState('All');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const filterCards = () => {
    return allCards.filter(card => {
      const descLower = card.desc.toLowerCase();
      const nameMatch = selectedCard.name && descLower.includes(selectedCard.name.toLowerCase());
      const archetypeMatch = selectedCard.archetype && descLower.includes(selectedCard.archetype.toLowerCase());
      const typeMatch = selectedCard.type && descLower.includes(selectedCard.type.toLowerCase());
      const raceMatch = selectedCard.race && descLower.includes(selectedCard.race.toLowerCase());
      const attributeMatch = selectedCard.attribute && card.desc.includes(selectedCard.attribute); // Case-sensitive

      const isTypeMatch = selectedType === 'All' || 
                          card.type === selectedType || 
                          (selectedType === 'Ritual Monster' && ['Ritual Effect Monster', 'Ritual Monster'].includes(card.type)) ||
                          (selectedType === 'Pendulum Monster' && ['Pendulum Effect Monster', 'Pendulum Normal Monster'].includes(card.type));

      return (nameMatch || archetypeMatch || typeMatch || raceMatch || attributeMatch) && isTypeMatch;
    });
  };

  const interactingCards = filterCards();

  return (
    <div>
      <h1 className='SearchHeader'>Advanced Interaction Finder</h1>
      <div className="filter-button-container">
        {MONSTER_TYPES.map(type => (
          <button
            key={type}
            className={`filter-button ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}>
              {type}
          </button>
        ))}
        <button
          className={`filter-button ${selectedType === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedType('All')}>
            All
        </button>
      </div>
      <p className='SearchHeader2' onClick={toggleCollapse}>
        Click here to reveal/hide cards
      </p>
      {!isCollapsed && (
        <div className='cards-grid'>
          {interactingCards.length > 0 ? 
            interactingCards.map(card => <CardDetails key={card.id} card={card} />) :
            <div className='NoResults'>No cards found</div>
          }
        </div>
      )}
    </div>
  );
}

export default AdvancedInteractionFinder;