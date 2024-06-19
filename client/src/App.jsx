import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./index/HomePage";
import API from "./api";

function App() {
    const [userData, setUserData] = useState({
        id: 1,
        username: "Guest",
        boardsCreated: [],
        boardsLiked: [],
        boardsDisliked: [],
    });
    const [boardData, setBoardData] = useState([]);

    const [inHome, setInHome] = useState(true);

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
        {
            inHome ? 
            <HomePage userData={[userData, setUserData]} boardData={[boardData, setBoardData]} />
            :
            <></>
        }
        </>
    );
}

export default App;
