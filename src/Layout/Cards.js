import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "./Card"

function Cards() {
    const [deck, setDeck] = useState([])
    const {deckId} = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal).then(setDeck).catch(error => {throw error})
        return () => abortController.abort()
    }, [deckId]);

    if (deck.cards) {
        const cardList = deck.cards.map((card) => <Card key={ card.id } card={ card } />)
        return (
            <div>
                {cardList}
            </div>
        );
    }

    return "Loading...";
}

export default Cards
