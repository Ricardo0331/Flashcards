import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from './utils/api/index.js';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedDecks = await listDecks();
      setDecks(fetchedDecks);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/decks/new">Create Deck</Link>
      {decks.map((deck) => (
        <div key={deck.id}>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <Link to={`/decks/${deck.id}/study`}>Study</Link>
          <Link to={`/decks/${deck.id}`}>View</Link>
          {/* Add Delete functionality here */}
        </div>
      ))}
    </div>
  );
}

export default Home;
