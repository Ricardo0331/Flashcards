import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from './utils/api/index';

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };
    loadDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCard + 1 < deck.cards.length) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      if (window.confirm('Restart cards?')) {
        setCurrentCard(0);
        setIsFlipped(false);
      }
    }
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name} / Study
      </nav>
      <h2>Study: {deck.name}</h2>
      <div>
        <p>Card {currentCard + 1} of {deck.cards.length}</p>
        <div>
          {isFlipped ? deck.cards[currentCard].back : deck.cards[currentCard].front}
        </div>
        <button onClick={handleFlip}>Flip</button>
        {isFlipped && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
}

export default Study;
