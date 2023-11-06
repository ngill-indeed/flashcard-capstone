import React from "react";
import { Link } from "react-router-dom";

function CardForm({deck, card, handleChange, handleSubmit}){
    return(
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                        <textarea
                            className="form-control" rows="5"
                            id="front"
                            name="front"
                            type="text"
                            placeholder="Front of card"
                            value={card.front}
                            onChange={handleChange}
                            
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description
                        <textarea
                            className="form-control" rows="5"
                            id="back"
                            name="back"
                            type="text"
                            placeholder="Back of card"
                            value={card.back}
                            onChange={handleChange}
                            
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-info">Save</button>
                <Link to={`/decks/${deck.id}`}>
                    <button type="button" className="btn btn-secondary ml-2">
                        Done
                    </button>
                </Link>
            </form>
    )
}

export default CardForm
