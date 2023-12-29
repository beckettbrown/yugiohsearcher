// CardDetails.js
import React, { useState } from 'react';

function CardDetails({ card, isSelected, handleSelectCard }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleCollapse = (event) => {
      event.stopPropagation(); // Add this line to stop the event from bubbling up
      setIsOpen(!isOpen);
      console.log(isOpen);
    };

return (
  <div className={`card-container ${isSelected ? 'selected' : ''}`} onClick={() => handleSelectCard(card)}>
    <div className="card-content">
      <div className="card-image-container">
        <img src={card.card_images[0].image_url} alt={card.name} className="card-image" />
      </div>
      <div className="card-details-container">
        <h3>{card.name} ({card.type})</h3>
        <p>{card.desc}</p>
        <p>ATK: {card.atk} / DEF: {card.def}</p>
        <p>Archetype: {card.archetype}</p>
        <p>Level: {card.level} | Race: {card.race} | Attribute: {card.attribute}</p>
        <button className="collapsible" onClick={toggleCollapse}>
          {isOpen ? 'Hide Card Sets' : 'Show Card Sets'}
        </button>
        <div className={`content ${isOpen ? 'active' : ''}`}>
          <ul>
            {card.card_sets && card.card_sets.map((set) => (
              <li key={set.set_code}>
                {set.set_name} - {set.set_rarity} - Price: ${set.set_price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
}

export default CardDetails;
