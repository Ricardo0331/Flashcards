import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from './utils/api/index';

function Deck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };
    fetchData();
  }, [deckId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      await deleteDeck(deckId);
      history.push('/');
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name}
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <button><Link to={`/decks/${deckId}/edit`}>Edit</Link></button>
      <button><Link to={`/decks/${deckId}/study`}>Study</Link></button>
      <button><Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link></button>
      <button onClick={handleDelete}>Delete</button>
      <h3>Cards</h3>
      {deck.cards && deck.cards.map((card) => (
        <div key={card.id}>
          <p>Question: {card.front}</p>
          <p>Answer: {card.back}</p>
          <button><Link to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link></button>
          <button onClick={() => {/* Add delete card functionality here */}}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Deck;
