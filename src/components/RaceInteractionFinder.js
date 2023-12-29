import React, { useState } from 'react';
import CardDetails from '../CardDetails';
import '../styles/CardStyles.css';

function RaceInteractionFinder({ selectedCard, allCards }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [filterType, setFilterType] = useState('race'); // 'race', 'attribute', or 'type'

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const findInteractingCards = () => {
        if (!allCards || !Array.isArray(allCards) || !selectedCard) {
            return [];
        }

        // Filter cards based on the selected filter type
        switch (filterType) {
            case 'race':
                return allCards.filter(card => selectedCard.race && card.race === selectedCard.race);
            case 'attribute':
                return allCards.filter(card => selectedCard.attribute && card.attribute === selectedCard.attribute);
            case 'type':
                return allCards.filter(card => selectedCard.type && card.type === selectedCard.type);
            default:
                return [];
        }
    };

    const interactingCards = findInteractingCards();

    return (
        <div>
            <h1 className='SearchHeader'>Race, Attribute, and Type Cards</h1>
            <div className='filter-button-container' >
                <button className={`filter-button ${filterType === 'race' ? 'active' : ''}`} onClick={() => setFilterType('race')}>Race</button>
                <button className={`filter-button ${filterType === 'attribute' ? 'active' : ''}`} onClick={() => setFilterType('attribute')}>Attribute</button>
                <button className={`filter-button ${filterType === 'type' ? 'active' : ''}`} onClick={() => setFilterType('type')}>Type</button>
            </div>
            <p className='SearchHeader2' onClick={toggleCollapse}>
                Click here to reveal/hide cards based on the selected card's {filterType}
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
                        <div className='NoResults'>No cards found for this category</div>
                    )}
                </>
            )}
        </div>
    );
}

export default RaceInteractionFinder;
