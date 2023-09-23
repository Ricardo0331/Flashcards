import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api/index';

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
        <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Add Card
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <input id="front" name="front" type="text" value={card.front} onChange={handleChange} />
        <label htmlFor="back">Back</label>
        <input id="back" name="back" type="text" value={card.back} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={handleDone}>Done</button> 
      </form>
    </>
  );
}

export default AddCard;
