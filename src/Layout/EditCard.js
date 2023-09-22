import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api/index';

function EditCard() {
  const [card, setCard] = useState({ front: '', back: '' });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCard = await readCard(cardId);
      setCard(fetchedCard);
    };
    fetchData();
  }, [cardId]);

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">Front</label>
      <textarea
        id="front"
        name="front"
        value={card.front}
        onChange={handleChange}
      />
      <label htmlFor="back">Back</label>
      <textarea
        id="back"
        name="back"
        value={card.back}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>
        Cancel
      </button>
    </form>
  );
}

export default EditCard;
