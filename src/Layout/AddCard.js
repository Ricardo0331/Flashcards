import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api/index';
import CardForm from './CardForm';

function AddCard() {
  const [card, setCard] = useState({ front: '', back: '' });
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchDeck() {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    }
    fetchDeck();
  }, [deckId]);

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, card);
    setCard({ front: '', back: '' }); // Clear the form
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`); // Navigate to the Deck screen
  };

  return (
    <>
      <nav>
      <li className="breadcrumb-primary"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-secondary">Add Card</li>      
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm 
        handleSubmit={handleSubmit} 
        card={card} 
        handleChange={handleChange}
        handleDone={handleDone}
        doneButtonName="Done"
      />
    </>
  );
}

export default AddCard;
