import { useState } from "react";
import BrowseBar from "./components/BrowseBar";
import BoardCard from "./components/BoardCard";
import propTypes from "prop-types";

HomePage.propTypes = {
    userData: propTypes.array.isRequired,
    boardData: propTypes.array.isRequired,
};

function HomePage(props) {
    const [filter, setFilter] = useState("All");

    return (
        <>
            {/* Banner */}
            <h1 className="text-primary text-center pt-3">
                <i className="bi bi-star-fill"></i>
                &nbsp; Kudos Board &nbsp;
                <i className="bi bi-star-fill"></i>
            </h1>

            <BrowseBar userData={props.userData} boardDataFunc={props.boardData[1]} filter={[filter, setFilter]} />

            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 justify-content-center w-100">
                {props.boardData[0].map((board, index) => {
                    return (
                        <BoardCard
                            key={index}
                            userData={props.userData}
                            boardData={props.boardData}
                            currentBoardCard={board}
                            isOwned={props.userData[0]["boardsCreated"].some(
                                (createdBoard) => createdBoard["id"] === board["id"]
                            )}
                            boardDataFunc={props.boardData[1]}
                            filter={filter}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default HomePage;
