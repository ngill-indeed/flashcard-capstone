import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
    const history = useHistory()
    const {deckId} = useParams()

    const [deck, setDeck] = useState([])
    const [card, setCard] = useState({})

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck(deck);
    }
    loadDeck()
    }, [deckId])

    const handleChange = ({target}) => {
        const value = target.value
        setCard({
            ...card,
            [target.name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deckId, card)
        history.go(0)
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm deck={deck} card={card} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default AddCard
