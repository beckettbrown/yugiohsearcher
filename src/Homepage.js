import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDetails from './CardDetails'; // Adjust the path as per your project structure
import { Link } from 'react-router-dom';
import './styles/CardStyles.css'; // Assuming this is the correct path
import Header from './Header';

function HomePage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to shuffle the array
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/CardDB.json');
        const shuffledCards = shuffleArray([...response.data.data]); // Shuffling a copy of the array
        setCards(shuffledCards.slice(0, 10)); // Get the first 16 cards
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
