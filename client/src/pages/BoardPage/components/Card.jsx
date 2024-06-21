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

    // handles the like/unlike event
    const likeCardFn = async () => {
        await API.likeCard(props.card["id"], props.userData[0]["id"], isLiked);
        await API.getBoardData(props.currentBoardDataFunc, props.boardId);
        API.getUserData(props.userData[1], props.userData[0]["id"]);
    };

    useEffect(() => {
        const userIsLiked = props.userData[0]["cardsLiked"].some((likedCard) => likedCard["id"] === props.card["id"]);
        if (isLiked != userIsLiked) {
            likeCardFn();
        }
    }, [isLiked]);

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
                <div>
                    {props.card["likes"]}
                    <i
                        className={"h5 bi bi-caret-up-fill " + (isLiked ? "like-active" : "")}
                        onClick={() => setIsLiked((old) => !old)}
                    ></i>
                </div>
            </div>
        </div>
    );
}

export default Card;
