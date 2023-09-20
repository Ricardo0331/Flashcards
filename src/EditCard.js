import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from './utils/api/index';

function EditCard() {
  const [card, setCard] = useState({});
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
      {/* Similar form fields as AddCard.js but populated */}
    </form>
  );
}

export default EditCard;
