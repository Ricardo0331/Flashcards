import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from './utils/api/index';

function CreateDeck() {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const history = useHistory();

  const handleChange = (event) => {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(deck);
    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / Create Deck
      </nav>
      <h2>Create Deck</h2>
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
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.push('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateDeck;
