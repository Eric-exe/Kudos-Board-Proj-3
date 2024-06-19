import propTypes from "prop-types";
import "./BoardCard.css";

BoardCard.propTypes = {
    board: propTypes.object.isRequired,
    isOwned: propTypes.bool.isRequired, // changes the ui to allow deletion and stops self-upvotes
};

/*
board = {
    "id" (int),
    "title" (string),
    "imgUrl" (string),
    "category" (string)
    "upvotes" (int)
}
*/

function BoardCard(props) {
    return (
        <div
            className={
                "card m-2 p-0 border border-2 rounded board-card " +
                (props.isOwned ? "border-success" : "border-primary")
            }
        >
            <img src={props.board["imgUrl"]} className="card-img-top img-thumbnail img-fluid mh-50" alt="Board image" />

            <div className="card-body">
                <div className="card-title d-flex flex-wrap align-items-center">
                    <h5 className="my-auto">{props.board["title"]}</h5>
                    &nbsp;
                    <span className="badge text-bg-secondary">{props.board["category"]}</span>
                </div>
                <h6 className="card-text">By: {props.board["author"]["username"]}</h6>
            </div>

            <div className="card-footer">
                {props.isOwned ? (
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-trash-fill h5 m-0 trash"></i>
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
