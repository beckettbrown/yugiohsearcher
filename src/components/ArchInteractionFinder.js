import React, {useState} from 'react';
import CardDetails from '../CardDetails';
import '../styles/CardStyles.css'

function ArchInteractionFinder({ selectedCard, allCards }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const findInteractingCards = () => {
        if (!allCards || !Array.isArray(allCards) || !selectedCard || !selectedCard.archetype) {
            return [];
        }

        return allCards.filter(card => card.archetype === selectedCard.archetype);
    };

    const interactingCards = findInteractingCards();

    return (
        <div>
            <h1 className='SearchHeader' >
                Archetype Cards
            </h1>
            <p className='SearchHeader2' onClick={toggleCollapse}>
                        Click here to reveal/hide cards that are part of the selected card's archetype
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

export default ArchInteractionFinder;
