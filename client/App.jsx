import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./src/pages/HomePage/HomePage";
import BoardPage from "./src/pages/BoardPage/BoardPage";
import API from "./src/api";

function App() {
    const [userData, setUserData] = useState({
        id: 1,
        username: "Guest",
        boardsCreated: [],
        boardsLiked: [],
        boardsDisliked: [],
    });
    // boardData handles all boards data being displayed in homepage
    const [boardData, setBoardData] = useState([]);

    // initialize the user/boards when loaded
    useEffect(() => {
        API.getUserData(setUserData, userData["id"]);
        API.getBoardData(setBoardData, {});
    }, []);

    // whenever boardData changes, update user data as well
    // as user data stores board creation/like/dislike data
    useEffect(() => {
        API.getUserData(setUserData, userData["id"]);
    }, [boardData]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    index
                    element={
                        <HomePage
                            userData={[userData, setUserData]}
                            boardData={[boardData, setBoardData]}
                        />
                    }
                />
                <Route path="board/:boardId" element={
                    <BoardPage 
                        userData={[userData, setUserData]}
                    />
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
