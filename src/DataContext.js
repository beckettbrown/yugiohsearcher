import React, { createContext, useState } from 'react';

// Context with default values
export const DataContext = createContext({
  isLoading: false,
  error: null,
  cards: [],
  setIsLoading: () => {},
  setError: () => {},
  setCards: () => {},
});

// Provider component to make state and setters available to children
export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);

  return (
    <DataContext.Provider
      value={{ isLoading, error, cards, setIsLoading, setError, setCards }}
    >
      {children}
    </DataContext.Provider>
  );
};
