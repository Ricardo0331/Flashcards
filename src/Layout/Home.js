import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedDecks = await listDecks();
      setDecks(fetchedDecks);
    }
    fetchData();
  }, []);

  const handleDelete = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
    }
  };

  return (
    <div>
      <Link to="/decks/new">
        <button className="create-deck-button">Create Deck</button>
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="deck-container">
            <h3>{deck.name}</h3>
            <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}/study`} className="home-button">Study</Link>
            <Link to={`/decks/${deck.id}`} className="home-button">View</Link>
            <button onClick={() => handleDelete(deck.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
