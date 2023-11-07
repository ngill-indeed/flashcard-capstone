import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";

function Card({ card }){
    const history = useHistory()
    const {url} = useRouteMatch()

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you use you want to delete this card? You will not be able to recover it.");
        if (confirmed) {
            await deleteCard(card.id);
            history.go(0)
        }
    };

    return(
        <div className="border border-dark my-4 mx-5 rounded p-4 bg-light">
            <table>
                <tbody>
                    <tr className="text-center">
                        <th className="col-md-4">Front</th>
                        <th className="col-md-4">Back</th>
                    </tr>
                    <tr className="m-2 text-center">
                        <td className="col-md-4 m-2">{card.front}</td>
                        <td className="col-md-4 m-2">{card.back}</td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <Link to={`${url}/cards/${card.id}/edit`}>
                    <button type="button" className="p-2 btn btn-secondary mt-4">Edit</button>
                </Link>
                <button type="button" className="ml-3 p-2 bd-highlight btn btn-outline-danger mt-4" onClick={handleDelete} style={{width:100}}>Delete</button>
            </div>
        </div>
    )
}

export default Card
