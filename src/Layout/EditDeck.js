import React, {useEffect, useState} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
    const history = useHistory()
    const {deckId} = useParams()
    const [deck, setDeck] = useState([])

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck(deck);
    }
    loadDeck()
    }, [deckId])


    const handleChange = ({target}) => {
        const value = target.value
        setDeck({
            ...deck,
            [target.name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateDeck(deck)
        history.push(`/decks/${deck.id}`)
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            {deck.id ? (
                <div name="create">
                    <h2>{deck.name}: Edit Deck</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" style={{"width": "90%"}}>
                                Name
                                <input className="form-control"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={deck.name}
                                    onChange={handleChange}
                                    
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" style={{"width": "90%"}}>
                                Description
                                <textarea className="form-control" rows="5"
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={deck.description}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-info">Save</button>
                        <Link to={`/decks/${deck.id}`}>
                            <button type="button" className="btn btn-secondary ml-2">Cancel</button>
                        </Link>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default EditDeck
