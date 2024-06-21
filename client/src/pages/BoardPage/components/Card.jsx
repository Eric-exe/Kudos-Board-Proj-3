import propTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Card.css";
import API from "../../../api";

Card.propTypes = {
    userData: propTypes.array.isRequired,
    boardId: propTypes.string.isRequired,
    currentBoardDataFunc: propTypes.func.isRequired,
    card: propTypes.object.isRequired,
    isOwned: propTypes.bool.isRequired,
};

function Card(props) {
    // init with info stored in userData
    const [isLiked, setIsLiked] = useState(
        props.userData[0]["cardsLiked"].some((likedCard) => likedCard["id"] === props.card["id"])
    );

    // handles the like/unlike event, updating user and board too
    const likeCardFn = async () => {
        await API.likeCard(props.card["id"], props.userData[0]["id"], isLiked);
        API.getUserData(props.userData[1], props.userData[0]["id"]);
        API.getBoardData(props.currentBoardDataFunc, props.boardId);
    };

    useEffect(() => {
        const userIsLiked = props.userData[0]["cardsLiked"].some((likedCard) => likedCard["id"] === props.card["id"]);
        if (isLiked != userIsLiked) {
            likeCardFn();
        }
    }, [isLiked]);

    // handle the deletion of a card
    const handleDeleteCard = async () => {
        await API.deleteCard(props.card["id"], props.userData[0]["id"]);
        API.getUserData(props.userData[1], props.userData[0]["id"]);
        API.getBoardData(props.currentBoardDataFunc, props.boardId);
    };

    return (
        <div className={"card m-2 border border-2 " + (props.isOwned ? "border-success" : "border-primary")}>
            <img src={props.card["gifUrl"]} className="card-img-top" />
            <div className="card-body gif-card-body overflow-auto">
                <h5 className="card-text">{props.card["content"]}</h5>
                {props.card["signed"] ? (
                    <h6 className="card-text text-end">- {props.card["author"]["username"]}</h6>
                ) : (
                    <></>
                )}
            </div>
            <div className="card-footer">
                <div className="d-flex align-items-center">
                    <i
                        className={"h4 bi bi-caret-up-fill m-0 " + (isLiked ? "like-active" : "")}
                        onClick={() => setIsLiked((old) => !old)}
                    />
                    {props.card["likes"]} &nbsp;
                    {
                        props.isOwned ? 
                        <i className="h5 bi bi-trash-fill m-0" onClick={handleDeleteCard}></i>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;
