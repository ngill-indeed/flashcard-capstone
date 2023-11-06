import React, { useState } from "react";
import {useHistory,  Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const history = useHistory();

    const initialDeckState = {
        name: "",
        description: "",
    };

    const [newDeck, setNewDeck] = useState({...initialDeckState})

    const handleChange = ({target}) => {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value
        })
        console.log(newDeck);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createDeck(newDeck)
        history.push("/")
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" style={{"width": "90%"}}>
                        Name
                        <input className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={newDeck.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description
                        <textarea className="form-control" rows="5"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Write a brief description here."
                            value={newDeck.description}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary ml-2">
                        Cancel
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default CreateDeck
