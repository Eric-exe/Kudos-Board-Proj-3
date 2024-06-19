import propTypes from "prop-types";
import './Board.css';
import API from '../../api'

Board.propTypes = {
    board: propTypes.object.isRequired,
    isOwned: propTypes.bool.isRequired // changes the ui to allow deletion and stops self-upvotes
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

function Board(props) {
    return (
        <div className={"card m-2 p-0 border border-2 rounded board-card " + (props.isOwned ? "border-success" : "border-primary")}>
            <img src={props.board["imgUrl"]} className="card-img-top img-thumbnail img-fluid mh-50" alt="Board image"/>

            <div className="card-body">
                <div className="card-title d-flex flex-wrap align-items-center">
                    <h5 className="my-auto">{props.board["title"]}</h5>
                    &nbsp;
                    <span className="badge text-bg-secondary">{props.board["category"]}</span>
                </div>
                <h6 className="card-text">By: {props.board["authorId"]}</h6>
            </div>

            <div className="card-footer">
                {
                    props.isOwned ? 
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-caret-up-fill h5 m-0"></i>
                            &nbsp;
                            {props.board["upvotes"]}
                            &nbsp;
                            <i className="bi bi-trash-fill h5 m-0 trash"></i>
                        </div>
                        <button className="btn btn-sm btn-outline-primary">View</button>
                    </div>
                    :
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-caret-up-square h5 upvote m-0"></i>
                            &nbsp;
                            <i className="bi bi-caret-down-square h5 downvote m-0"></i>
                            &nbsp;
                            {props.board["upvotes"]}
                        </div>

                        <button className="btn btn-sm btn-outline-primary">View</button>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Board