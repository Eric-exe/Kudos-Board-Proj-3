import { useState, useEffect } from "react";
import "./App.css";
import BrowseBar from "./components/BrowseBar";
import BoardCard from "./components/BoardCard";
import API from "../api";

function App() {
    const [userData, setUserData] = useState({
        id: 1,
        username: "Guest",
        boardsCreated: [],
        boardsLiked: [],
        boardsDisliked: [],
    });
    const [boardData, setBoardData] = useState([]);

    const [category, setCategory] = useState("All");

    // initialize the user/boards when loaded
    useEffect(() => {
        API.getUserData(setUserData, userData["id"]);
        API.getBoardData(setBoardData);
    }, []);

    // whenever boardData changes, update user data as well
    // as user data stores board creation/like/dislike data
    useEffect(() => {
        API.getUserData(setUserData, userData["id"]);
    }, [boardData]);

    return (
        <>
            <header className="d-flex justify-content-between text-white bg-primary px-3 py-2">
                <h2 className="m-0">Kudos Board</h2>
                <button type="button" className="btn btn-outline-light">
                    {userData["username"]}
                </button>
            </header>
            <BrowseBar
                userData={[userData, setUserData]}
                boardDataFunc={setBoardData}
                category={[category, setCategory]}
            />

            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 justify-content-center w-100">
                {boardData.map((board, index) => {
                    return (
                        <BoardCard
                            key={index}
                            board={board}
                            isOwned={userData["boardsCreated"].some(
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

export default App;
