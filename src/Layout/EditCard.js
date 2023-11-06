import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom/";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
    const history = useHistory()
    const {cardId, deckId} = useParams()
    const [card, setCard] = useState([])
    const [deck, setDeck] = useState([])
    
    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck(deck);
    }
    loadDeck()
    }, [deckId])

    useEffect(() => {
        async function loadCard() {
            const card = await readCard(cardId);
            setCard(card);
    }
    loadCard()
    }, [cardId])

    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deck.id}`)
    }

    return(
        <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
            </ol>
        </nav>
        {card.id ? (
            <div>
                <h2>{deck.name}: Edit Card {card.id}</h2>
                <CardForm card={card} deck={deck} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    )
}

export default EditCard
