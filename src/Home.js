import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from './utils/api/index';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedDecks = await listDecks();
      setDecks(fetchedDecks);
    }
    fetchData();
  }, []);

  const handleDelete = (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      // Add your delete logic here
    }
  };

  return (
    <div>
      <Link to="/decks/new">Create Deck</Link>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}`}>View</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <button onClick={() => handleDelete(deck.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
