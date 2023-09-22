import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Study from './Study';
import CreateDeck from './CreateDeck';
import Deck from './Deck';
import EditDeck from './EditDeck';
import AddCard from './AddCard';
import EditCard from './EditCard';
import { listDecks } from './utils/api';
import NotFound from './Layout/NotFound';

function App() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedDecks = await listDecks();
      setDecks(fetchedDecks);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck decks={decks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study decks={decks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck decks={decks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard decks={decks} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard decks={decks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
