import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import AddCard from "./AddCard";
import Header from "./Header";
import NotFound from "./NotFound";
import ViewDeck from "./ViewDeck";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

function Layout() {

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
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
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
