import propTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import API from "../../../api";
import "./BoardCard.css";

BoardCard.propTypes = {
    userData: propTypes.array.isRequired,
    boardData: propTypes.array.isRequired,
    currentBoardCard: propTypes.object.isRequired,
    isOwned: propTypes.bool.isRequired, // changes the ui to allow deletion and stops self-upvotes
    boardDataFunc: propTypes.func.isRequired,
    filter: propTypes.string.isRequired,
};

function BoardCard(props) {
    // handle the deletion of a board card
    const handleDeleteBoardCard = () => {
        API.deleteBoard(props.currentBoardCard["id"], props.userData["id"]);
        props.boardData[1](props.boardData[0].filter((board) => board["id"] !== props.currentBoardCard["id"]));
    };

    const navigate = useNavigate();

    return (
        <div
            className={
                "card m-2 p-0 border border-2 rounded board-card " +
                (props.isOwned ? "border-success" : "border-primary")
            }
        >
            <img src={props.currentBoardCard["imgUrl"]} className="card-img-top img-thumbnail img-fluid mh-50" alt="Board image" />

            <div className="card-body">
                <div className="card-title">
                    <h5 className="my-auto text mr-1">{props.currentBoardCard["title"]}</h5>
                    <span className="badge text-bg-secondary">{props.currentBoardCard["category"]}</span>
                </div>
                <h6 className="card-text text">By: {props.currentBoardCard["author"]["username"]}</h6>
            </div>

            <div className="card-footer">
                {props.isOwned ? (
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-trash-fill h5 m-0 trash" onClick={handleDeleteBoardCard}></i>
                        </div>
                        <div className="btn btn-sm btn-outline-primary" onClick={() => navigate("/board/" + props.currentBoardCard["id"])}>
                            View
                        </div>
                    </div>
                ) : (
                    <div className="d-flex flex-wrap justify-content-end">
                        <div className="btn btn-sm btn-outline-primary" onClick={() => navigate("/board/" + props.currentBoardCard["id"])}>
                            View
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoardCard;
