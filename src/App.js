import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from "./Layout";
import "./App.css";
import Home from "./Home";


function App() {
  const [decks, setDecks] = useState([]);

useEffect(() => {
  // Fetch decks from API and set state
}, []);


  return (
    <div className="app-routes">
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
