import propTypes from "prop-types";
import API from "../../../api";
import "./BoardCard.css";

BoardCard.propTypes = {
    userData: propTypes.array.isRequired,
    boardData: propTypes.array.isRequired,

    board: propTypes.object.isRequired,
    isOwned: propTypes.bool.isRequired, // changes the ui to allow deletion and stops self-upvotes
    boardDataFunc: propTypes.func.isRequired,
    filter: propTypes.string.isRequired,
};

function BoardCard(props) {
    // handle the deletion of a board card
    const handleDeleteBoardCard = () => {
        API.deleteBoard(() => {}, props.board["id"], props.userData["id"]);
        // delete from boardData state
        props.boardData[1](props.boardData[0].filter((board) => board["id"] !== props.board["id"]));
    };

    return (
        <div
            className={
                "card m-2 p-0 border border-2 rounded board-card " +
                (props.isOwned ? "border-success" : "border-primary")
            }
        >
            <img src={props.board["imgUrl"]} className="card-img-top img-thumbnail img-fluid mh-50" alt="Board image" />

            <div className="card-body">
                <div className="card-title">
                    <h5 className="my-auto text mr-1">{props.board["title"]}</h5>
                    <span className="badge text-bg-secondary">{props.board["category"]}</span>
                </div>
                <h6 className="card-text text">By: {props.board["author"]["username"]}</h6>
            </div>

            <div className="card-footer">
                {props.isOwned ? (
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-trash-fill h5 m-0 trash" onClick={handleDeleteBoardCard}></i>
                        </div>
                        <a className="btn btn-sm btn-outline-primary" href={"/board/" + props.board["id"]}>
                            View
                        </a>
                    </div>
                ) : (
                    <div className="d-flex flex-wrap justify-content-end">
                        <a className="btn btn-sm btn-outline-primary" href={"/board/" + props.board["id"]}>
                            View
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoardCard;
