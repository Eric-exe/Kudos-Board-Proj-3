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

    // update the like status whenever user changes
    useEffect(() => {
        setIsLiked(props.userData[0]["cardsLiked"].some((likedCard) => likedCard["id"] == props.card["id"]));
    }, [props.userData[0]["id"]]);

    const updateData = async (func) => {
        await func();
        API.getUserData(props.userData[1], props.userData[0]["id"]);
        API.getBoardData(props.currentBoardDataFunc, props.boardId);
    };

    // handle the like when the user presses the upvote button
    useEffect(() => {
        const userIsLiked = props.userData[0]["cardsLiked"].some((likedCard) => likedCard["id"] === props.card["id"]);
        if (isLiked != userIsLiked) {
            updateData(async () => {
                await API.likeCard(props.card["id"], props.userData[0]["id"], isLiked);
            });
        }
    }, [isLiked]);

    const handleDeleteCard = async () => {
        updateData(async () => { await API.deleteCard(props.card["id"], props.userData[0]["id"]); });
    };

    // handle the creation of comments inside the card
    const [comment, setComment] = useState("");
    const handleCreateComment = () => {
        if (comment == "") {
            return;
        }
        updateData(async () => { await API.createComment(props.card["id"], props.userData[0]["id"], comment); });
        setComment("");
    };

    return (
        <>
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
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <i
                                className={"h4 bi bi-caret-up-fill m-0 like " + (isLiked ? "like-active" : "")}
                                onClick={() => setIsLiked((old) => !old)}
                            />
                            {props.card["likes"]} &nbsp;
                            {props.isOwned ? (
                                <i className="trash h5 bi bi-trash-fill m-0" onClick={handleDeleteCard}></i>
                            ) : (
                                <></>
                            )}
                        </div>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#${props.card["id"]}-commentsModal`}
                        >
                            View comments
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg fade" tabIndex="-1" id={`${props.card["id"]}-commentsModal`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Comments</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {props.card["comments"].map((comment, index) => {
                                return (
                                    <p key={index} className="mb-1">
                                        <b>[{comment["author"]["username"]}]:</b> {comment["content"]}
                                    </p>
                                );
                            })}
                        </div>
                        <div className="modal-footer d-inline-block justify-content-center">
                            <div className="row">
                                <div className="col-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                    ></input>
                                </div>
                                <div className="col-2 d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary" onClick={handleCreateComment}>
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
