import React from 'react';
import { useLocation } from 'react-router-dom';
import CardDetails from './CardDetails';
import SearcherInteractionFinder from './components/SearcherInteractionFinder';
import './styles/InteractionPage.css';
import ArchInteractionFinder from './components/ArchInteractionFinder';
import SummonInteractionFinder from './components/SummonInteractionFinder';
import Header from './Header';
import RaceInteractionFinder from './components/RaceInteractionFinder';
import AdvancedInteractionFinder from './components/AdvancedInteractionFinder';

function InteractionPage() {
  const location = useLocation();
  const { selectedCard, allCards } = location.state || {};

  return (
    <div>
      <Header />
      <div className='selected-card-container'>
        {selectedCard && <CardDetails card={selectedCard} />}
      </div>
      <hr />
      <div className='interaction-results'>
        <SearcherInteractionFinder selectedCard={selectedCard} allCards={allCards} />
      </div>
      <hr />
      <div className='interaction-results'>
        <SummonInteractionFinder selectedCard={selectedCard} allCards={allCards} />
      </div>
      <hr />
      <div className='interaction-results'>
        <ArchInteractionFinder selectedCard={selectedCard} allCards={allCards} />
      </div>
      <hr />
      <div className='interaction-results'>
        <RaceInteractionFinder selectedCard={selectedCard} allCards={allCards} />
      </div>
      <hr />
      <div className='interaction-results'>
        <AdvancedInteractionFinder selectedCard={selectedCard} allCards={allCards} />
      </div>
      <hr />
    </div>
  );
}

export default InteractionPage;
