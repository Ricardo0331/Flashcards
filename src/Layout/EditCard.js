import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api/index';
import CardForm from './CardForm';

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

  const handleCancel = () => history.push(`/decks/${deckId}`)


  return (
    <CardForm 
      handleSubmit={handleSubmit} 
      card={card} 
      handleChange={handleChange}
      handleDone={handleCancel}
      doneButtonName="Cancel"
    />
);
}

export default EditCard;
