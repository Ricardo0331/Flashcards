import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const [deck, setDeck] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };
    fetchData();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      if (window.confirm('Restart cards?')) {
        setCurrentCard(0);
        setIsFlipped(false);
      } else {
        history.push('/');
      }
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name} / Study
      </nav>
      <h2>Study: {deck.name}</h2>
      {deck.cards && deck.cards.length >= 3 ? (
        <div>
          <p>Card {currentCard + 1} of {deck.cards.length}</p>
          <div>
            {isFlipped ? deck.cards[currentCard].back : deck.cards[currentCard].front}
          </div>
          <button onClick={handleFlip}>Flip</button>
          {isFlipped && <button onClick={handleNext}>Next</button>}
        </div>
      ) : (
        <p>Not enough cards. You need at least 3 cards to study.</p>
      )}
    </div>
  );
}

export default Study;
