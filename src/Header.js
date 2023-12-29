import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CardStyles.css';

function Header() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/'); // Navigates to the homepage
  };

  return (
    <div className='banner' onClick={goToHomePage} style={{ cursor: 'pointer' }}>
      <h1>Yu-Gi-Oh Searcher Tool</h1>
    </div>
  );
}

export default Header;
