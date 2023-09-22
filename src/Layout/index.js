import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Study from './Study';
import CreateDeck from './CreateDeck';
import Deck from './Deck';
import EditDeck from './EditDeck';
import AddCard from './AddCard';
import EditCard from './EditCard';
import { listDecks } from '../utils/api/index';
import NotFound from './NotFound';
import Header from './Header';

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedDecks = await listDecks();
      setDecks(fetchedDecks);
    }
    fetchData();
  }, []);

return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
             <Home />
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
