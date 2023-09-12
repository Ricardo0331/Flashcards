import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck } from './utils/api/index';

function Study() {
  const [deck, setDeck] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    }
    fetchData();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCard + 1 < deck.cards.length) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      // Reset and ask if the user wants to restart
    }
  };

  if (deck.cards && deck.cards.length <= 2) {
    return (
      <div>
        <h2>Study: {deck.name}</h2>
        <h3>Not Enough Cards</h3>
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
        <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Study: {deck.name}</h2>
      {/* Your existing card flipping and navigation logic here */}
      <button onClick={handleFlip}>Flip</button>
      {isFlipped && <button onClick={handleNext}>Next</button>}
    </div>
  );
}

export default Study;