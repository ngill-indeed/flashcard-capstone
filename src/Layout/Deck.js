import React from "react";
import {useHistory,  Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Deck({ deck }){
    const history = useHistory();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you use you want to delete the deck? You will not be able to recover it.");
        if (confirmed) {
            await deleteDeck(deck.id);
            history.go(0);
        }
    };

    return (
        <article>
            <div className="border p-4 h-100 d-flex flex-column m-5">
                <div className="d-flex justify-content-between">
                    <h3>{deck.name}</h3>
                    {deck.cards.length} cards
                </div>
                <p>{deck.description}</p>
                <div className="d-flex flex-row bd-highlight mb-1">
                    <Link to={`/decks/${deck.id}`}>
                        <button type="button" className="ml-2 btn btn-secondary">View</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button type="button" className="ml-2 btn btn-secondary">Study</button>
                    </Link>
                    <button type="button" className="ml-auto p-2 bd-highlight btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </article>
    )
}

export default Deck
