import { useState, useEffect } from "react";
import "./HomePage.css";
import BrowseBar from "./components/BrowseBar";
import BoardCard from "./components/BoardCard";
import propTypes from "prop-types";

HomePage.propTypes = {
    userData: propTypes.array.isRequired,
    boardData: propTypes.array.isRequired,
}

function HomePage(props) {
    const [category, setCategory] = useState("All");

    return (
        <>
            <header className="d-flex justify-content-between text-white bg-primary px-3 py-2">
                <h2 className="m-0">Kudos Board</h2>
                <button type="button" className="btn btn-outline-light">
                    {props.userData[0]["username"]}
                </button>
            </header>
            <BrowseBar
                userData={props.userData}
                boardDataFunc={props.boardData[1]}
                category={[category, setCategory]}
            />

            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 justify-content-center w-100">
                {props.boardData[0].map((board, index) => {
                    return (
                        <BoardCard
                            key={index}
                            board={board}
                            isOwned={props.userData[0]["boardsCreated"].some(
                                (createdBoard) => createdBoard["id"] === board["id"]
                            )}
                        />
                    );
                })}
            </div>

            <footer>
                <div className="d-flex justify-content-center text-white bg-primary p-2">
                    <p className="m-0">Kudos Board</p>
                </div>
            </footer>
        </>
    );
}

export default HomePage;