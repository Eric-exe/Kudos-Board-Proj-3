import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./src/pages/HomePage/HomePage";
import BoardPage from "./src/pages/BoardPage/BoardPage";
import API from "./src/api";

function App() {
    const [userData, setUserData] = useState({
        id: -1,
        username: "Guest",
        boardsCreated: [],
        cardsCreated: [],
        cardsLiked: [],
        commentsCreated: [],
    });
    // boardData handles all boards data being displayed in homepage
    const [boardData, setBoardData] = useState([]);

    // initialize the user/boards when loaded
    useEffect(() => {
        API.getUserData(setUserData, userData["id"]);
        API.getBoardsData(setBoardData, {});
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

            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<HomePage userData={[userData, setUserData]} boardData={[boardData, setBoardData]} />}
                    />
                    <Route path="board/:boardId" element={<BoardPage userData={[userData, setUserData]} />} />
                </Routes>
            </BrowserRouter>

            <footer className="d-flex justify-content-center text-white bg-primary p-2">
                <p className="m-0">Kudos Board</p>
            </footer>
        </>
    );
}

export default App;
