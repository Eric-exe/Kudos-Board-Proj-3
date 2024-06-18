import propTypes from "prop-types";
import './Board.css';

Board.propTypes = {
    imgSrc: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    upvotes: propTypes.number.isRequired,
    isOwned: propTypes.bool.isRequired,
};

function Board(props) {
    return (
        <div className={"card m-2 border border-2 rounded board-card " + (props.isOwned ? "border-success" : "border-primary")}>
            <img src={props.imgSrc} className="card-img-top" alt="Board image"/>

            <div className="card-body">
                <div className="card-title d-flex align-items-center">
                    <h5 className="my-auto">{props.title}</h5>
                    &nbsp;
                    <span className="badge text-bg-secondary">{props.category}</span>
                </div>
                <h6 className="card-text">By: {props.author}</h6>
            </div>

            <div className="card-footer">
                {
                    props.isOwned ? 
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-caret-up-fill h5 m-0"></i>
                            &nbsp;
                            {props.upvotes}
                            &nbsp;
                            <i className="bi bi-trash-fill h5 m-0 trash"></i>
                        </div>
                        <button className="btn btn-sm btn-outline-primary">View Board</button>
                    </div>
                    :
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-caret-up-square h5 upvote m-0"></i>
                            &nbsp;
                            <i className="bi bi-caret-down-square h5 downvote m-0"></i>
                            &nbsp;
                            {props.upvotes}
                        </div>

                        <button className="btn btn-sm btn-outline-primary">View Board</button>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Board