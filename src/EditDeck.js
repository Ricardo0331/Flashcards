import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from './utils/api/index';

function EditDeck() {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };
    fetchData();
  }, [deckId]);

  const handleChange = (event) => {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deckId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={deck.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={deck.description}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>
        Cancel
      </button>
    </form>
  );
}

export default EditDeck;
