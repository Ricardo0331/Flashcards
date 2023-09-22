import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const [deck, setDeck] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const [flip, setFlip] = useState(false);
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    }
    fetchData();
  }, [deckId]);

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleNext = () => {
    if (currentCard + 1 < deck.cards.length) {
      setCurrentCard(currentCard + 1);
      setFlip(false);
    } else {
      if (window.confirm('Restart cards?')) {
        setCurrentCard(0);
        setFlip(false);
      }
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name} / Study
      </nav>
      <h1>Study: {deck.name}</h1>
      {deck.cards && deck.cards.length >= 3 ? (
        <div>
          <p>Card {currentCard + 1} of {deck.cards.length}</p>
          <div className="card">
            <p>{flip ? deck.cards[currentCard].back : deck.cards[currentCard].front}</p>
          </div>
          <button onClick={handleFlip}>Flip</button>
          {flip && <button onClick={handleNext}>Next</button>}
        </div>
      ) : (
        <>
          <p>Not enough cards. You need at least 3 cards to study.</p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Study;
