import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import Search from './Search';
import InteractionPage from './InteractionPage'; // Import the new InteractionPage component
import axios from 'axios';

function App() {
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/CardDB.json');
        setAllCards(response.data.data || []);
      } catch (err) {
        console.error("Error fetching card data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search allCards={allCards} />} />
        <Route path="/interaction" element={<InteractionPage allCards={allCards} />} />
      </Routes>
    </Router>
  );
}

export default App;
