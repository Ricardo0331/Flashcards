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
      <h1>Alpha FlashMaster</h1>
      <p>Master Your Studies, One Flashcard at a Time!</p> 
      <div>
      <Link to="/decks/new">Create Deck</Link>
        {decks.map((deck) => (
          <div key={deck.id}>
            <h3>{deck.name}</h3>
            <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <Link to={`/decks/${deck.id}`}>View</Link>
            <button onClick={() => handleDelete(deck.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
