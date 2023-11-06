import React, {useState, useEffect} from "react";
import { useParams, useRouteMatch, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import Cards from "./Cards";

function ViewDeck() {
    const history = useHistory()
    const {url} = useRouteMatch()
    const {deckId} = useParams()
    const [deck, setDeck] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal).then(setDeck).catch(error => {throw error})
        return () => abortController.abort()
    }, [deckId]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you use you want to delete the deck? You will not be able to recover it.");
        if (confirmed) {
            await deleteDeck(deckId);
            history.push("/");
        }
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div className="d-flex flex-row bd-highlight mb-1">
                <Link to={`${url}/edit`}>
                    <button type="button" className="ml-2 btn btn-secondary">Edit</button>
                </Link>
                <Link to={`${url}/study`}>
                    <button type="button" className="ml-2 btn btn-secondary mr-2">Study</button>
                </Link>
                <Link to={`${url}/cards/new`}>
                    <button type="button" className="btn btn-info mr-2">Add Card</button>
                </Link>
                <button type="button" className="ml-auto p-2 bd-highlight btn btn-outline-danger" onClick={handleDelete}>Delete</button>
            </div>
            <h3>Cards</h3>
            <Cards />
        </div>
    )
}

export default ViewDeck
