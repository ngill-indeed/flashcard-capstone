import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import Deck from "./Deck";

function Home() {
    const [decks, setDecks] = useState([]);
 
    useEffect(() => {
        const abortController = new AbortController()
        listDecks(abortController.signal).then(setDecks).catch(error => {throw error});
        return () => abortController.abort()
    }, []);
    
    return (
        <div>
            <Link to="/decks/new"><button type="button" className="btn btn-info">Create Deck</button></Link>
            <main className="container">
                <section>{decks.map((deck) => <Deck key={deck.id} deck={deck} />)}</section>
            </main>
        </div>
    )
}

export default Home