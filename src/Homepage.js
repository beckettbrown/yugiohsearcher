import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDetails from './CardDetails'; 
import { Link } from 'react-router-dom';
import './styles/CardStyles.css'; 
import Header from './Header';

function HomePage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/CardDB.json`);
        ;
        console.log('Public URL:', process.env.PUBLIC_URL);

        const shuffledCards = shuffleArray([...response.data.data]); 
        setCards(shuffledCards.slice(0, 10)); 
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <br></br>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}<Link to="/search">
        <button className='ygo-button'  >Click Here To Search</button>
        <br></br>
      </Link>
      <div className='cards-grid'>
        {cards.map(card => (
          <CardDetails key={card.id} card={card} />
        ))}
      </div>
      
    </div>
  );
}

export default HomePage;
