import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createCard } from '../utils/api/index';

function AddCard() {
  const [card, setCard] = useState({ front: '', back: '' });
  const { deckId } = useParams();
  const history = useHistory();

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">Front</label>
      <input id="front" name="front" type="text" value={card.front} onChange={handleChange} />
      <label htmlFor="back">Back</label>
      <input id="back" name="back" type="text" value={card.back} onChange={handleChange} />
      <button type="submit">Save</button>
      <button type="button" onClick={handleDone}>Done</button> 
    </form>
  );
}

export default AddCard;
