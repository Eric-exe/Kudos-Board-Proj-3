import propTypes from "prop-types";
import './Card.css'

Card.propTypes = {
    userData: propTypes.array.isRequired,
    card: propTypes.object.isRequired,
    isOwned: propTypes.bool.isRequired,
};

function Card(props) {
    return (
        <div className="card m-2 border border-2 border-primary">
            <img src={props.card["gifUrl"]} className="card-img-top"/>
            <div className="card-body overflow-scroll">
                <h5 className="card-title">{props.card["content"]}</h5>
            </div>
            <div className="card-footer">
                <i className="bi bi-caret-up-fill"></i>
            </div>
        </div>
    );
}

export default Card;
