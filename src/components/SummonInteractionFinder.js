import React, {useState} from 'react';
import CardDetails from '../CardDetails';
import '../styles/CardStyles.css';

function SummonInteractionFinder({ selectedCard, allCards }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    const findInteractingCards = () => {
        if (!allCards || !Array.isArray(allCards) || !selectedCard) return [];

        return allCards.filter(card => {
            const descLower = card.desc.toLowerCase();
            const cardNameLower = selectedCard.name.toLowerCase();
            const archetypeLower = selectedCard.archetype ? selectedCard.archetype.toLowerCase() : "";
            const levelLower = selectedCard.archetype ? selectedCard.archetype.toLowerCase() : "";
            const attributeLower = selectedCard.archetype ? selectedCard.archetype.toLowerCase() : "";
            const summonKeyword = "summon";

            // Check if description contains 'summon' and either the card's name or archetype
            return descLower.includes(summonKeyword) && 
                   (descLower.includes(cardNameLower) || descLower.includes(archetypeLower) || (descLower.includes(levelLower) && descLower.includes(attributeLower)));
        });
    };

    const interactingCards = findInteractingCards();

    return (
        <div>
            <h1 className='SearchHeader' >
                Summon Cards
            </h1>
            <p className='SearchHeader2'onClick={toggleCollapse}>
                        Click here to reveal/hide cards that can be used to Summon the selected card
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

export default SummonInteractionFinder;
