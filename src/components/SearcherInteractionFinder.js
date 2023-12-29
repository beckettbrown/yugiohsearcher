import React, { useState } from 'react';
import CardDetails from '../CardDetails';
import '../styles/CardStyles.css';

function SearcherInteractionFinder({ selectedCard, allCards }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const findInteractingCards = () => {
      if (!allCards || !Array.isArray(allCards) || !selectedCard) return [];

      // Define the keywords or phrases that determine interaction
      const interactionKeywords = [
        `Summon 1 "${selectedCard.name}" from your Deck`,
        `Summon 1 "${selectedCard.name}" from your GY`,
        `Summon 1 "${selectedCard.name}" from your Graveyard`,
        `"${selectedCard.name}" from your Deck`,
        `"${selectedCard.name}" from your hand`,
        `Draw 1 "${selectedCard.name}"`,
        `Add 1 "${selectedCard.name}"`,
        `draw 1 "${selectedCard.name}"`,
        `add 1 "${selectedCard.name}"`,
        `copies of "${selectedCard.name}"`,
        `copy of "${selectedCard.name}"`,

        
        `Summon 1 "${selectedCard.race}" monster from your Deck`,
        `Summon 1 ${selectedCard.race} monster from your hand`,
        `Summon 1 ${selectedCard.race} monster from your GY`,
        `Summon 1 ${selectedCard.race} monster from your Graveyard`,
        `"${selectedCard.race}" monster from your Deck`,
        `"${selectedCard.race}" monster from your Graveyard`,
        `"${selectedCard.race}" monster from your GY`,
        `"${selectedCard.race}" monster from your Extra Deck`,
        `"${selectedCard.race}" monster from your Banish`,
        `Draw 1 "${selectedCard.race}"`,
        `Add 1 "${selectedCard.race}"`,
        `draw 1 "${selectedCard.race}"`,
        `add 1 "${selectedCard.race}"`,

        `Summon 1 "${selectedCard.attribute}" monster from your Deck`,
        `Summon 1 ${selectedCard.attribute} monster from your hand`,
        `Summon 1 ${selectedCard.attribute} monster from your GY`,
        `Summon 1 ${selectedCard.attribute} monster from your Graveyard`,
        `"${selectedCard.attribute}" monster from your Deck`,
        `"${selectedCard.attribute}" monster from your Graveyard`,
        `"${selectedCard.attribute}" monster from your GY`,
        `"${selectedCard.attribute}" monster from your Extra Deck`,
        `"${selectedCard.attribute}" monster from your Banish`,
        `Draw 1 "${selectedCard.attribute}"`,
        `Add 1 "${selectedCard.attribute}"`,
        `draw 1 "${selectedCard.attribute}"`,
        `add 1 "${selectedCard.attribute}"`,

      // Add more phrases or keywords as needed
    ];

    return allCards.filter(card => 
      interactionKeywords.some(keyword => card.desc.includes(keyword))
    );
  };

  const interactingCards = findInteractingCards();

  return (
      <div>
          <h1 className='SearchHeader' >
              Searcher Cards
          </h1>
          <p className='SearchHeader2' onClick={toggleCollapse}>
                      Click here to reveal/hide cards that can be used to Search for the selected card
                  </p>

          {!isCollapsed && (
              <>
                 
                  {interactingCards.length > 0 ? (
                      <div className='cards-grid'>
                          {interactingCards.map(card => (
                              <CardDetails key={card.id} card={card} />
                          ))}
                      </div>
                  ) : (
                      <div className='NoResults'>No Searcher cards found</div>
                  )}
              </>
          )}
      </div>
  );
}

export default SearcherInteractionFinder;