import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() { 
    const history = useHistory()
    const {deckId} = useParams()

    const [deck, setDeck] = useState([])
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCard, setCurrentCard] = useState(0);

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck(deck);
    }
    loadDeck()
    }, [deckId])

    const handleFlip = (event) => {
        setIsFlipped(!isFlipped);
    }

    const handleNext = () => {
        setCurrentCard(currentCard + 1);
        if (currentCard === deck.cards.length - 1) {
            const confirmed = window.confirm("Do you want to restart the deck?");
            if (!confirmed) {
                history.push("/");
            }
            else {
                setCurrentCard(0);
            }          
        }
    }

    if (deck.cards) {
        if (deck.cards < 3) {
            return (
                <div>
                    <h3>{deck.name}</h3>
                    <h4>Not enough cards</h4>
                    You must have at least three cards to study.
                    <Link to={`/decks/${deck.id}/cards/new`}>
                        <button type="button" className="btn btn-info mt-4">Add Card</button>
                    </Link>
                </div>
            )
        } else {
            return (        
                <div className="border border-dark my-4 mx-5 rounded p-4 bg-light">
                    <h3>{deck.name}</h3>
                    <h4>Card {currentCard + 1} of {deck.cards.length}</h4>
                    {!isFlipped ? <p>{deck.cards[currentCard].front}</p> : <p>{deck.cards[currentCard].back}</p>}
                    <button type="button" className="btn btn-secondary mr-2" onClick={handleFlip}>Flip</button>
                    {isFlipped? <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button> : <div></div>}
                </div>
            );
        }
    }
    else {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
                <p>Loading...</p>
            </nav>
        )
    }
}

export default Study;
