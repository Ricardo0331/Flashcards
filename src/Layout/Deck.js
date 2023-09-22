import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api/index';

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

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card? You wont be able to recover it.')) {
      await deleteCard(cardId);
      const updatedDeck = await readDeck(deckId);
      setDeck(updatedDeck);
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name}
      </nav>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`}>Edit</Link>
      <Link to={`/decks/${deckId}/study`}>Study</Link>
      <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
      <button onClick={handleDelete}>Delete</button>

      <h2>Cards</h2>
      {deck.cards && deck.cards.map((card) => (
        <div key={card.id}>
          <p>Front: </p><p>{card.front}</p>
          <p>Back: </p><p>{card.back}</p>
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link>
          <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Deck;
