import { useState } from "react";
import "./App.css";
import BrowseBar from "./components/BrowseBar";
import Board from "./components/Board";

function App() {
    const [user, setUser] = useState('Guest'); // 'Guest' or unique username
    const [userInfo, setUserInfo] = useState({}); // { boardsCreated: [id], boardsUpvoted: [id], boardsDownvoted: [id]}

    const [category, setCategory] = useState('All');

    return (
        <>
        <header className="d-flex justify-content-between text-white bg-primary px-3 py-2">
            <h2 className="m-0">Kudos Board</h2>
            <button type="button" className="btn btn-outline-light">{user}</button>
        </header>
            <BrowseBar 
                category={[category, setCategory]}
            />

            <div className="d-flex flex-wrap row-cols-2 row-cols-md-4 row-cols-lg-5 p-2 justify-content-center">
                <Board 
                    imgSrc="https://via.placeholder.com/150"
                    title="Board Title"
                    category="Thank You"
                    author="Author"
                    upvotes={0}
                    isOwned={false}
                />

                <Board 
                    imgSrc="https://via.placeholder.com/350"
                    title="Board Title"
                    category="Celebration"
                    author="Author"
                    upvotes={0}
                    isOwned={true}
                />

                <Board 
                    imgSrc="https://via.placeholder.com/1050"
                    title="Board Title"
                    category="Inspiration"
                    author="Author"
                    upvotes={0}
                    isOwned={false}
                />

                <Board 
                    imgSrc="https://via.placeholder.com/1050"
                    title="Board Title"
                    author="Author"
                    upvotes={0}
                    isOwned={false}
                />

                <Board 
                    imgSrc="https://via.placeholder.com/1050"
                    title="Board Title"
                    author="Author"
                    upvotes={0}
                    isOwned={false}
                />

                <Board 
                    imgSrc="https://via.placeholder.com/1050"
                    title="Board Title"
                    author="Author"
                    upvotes={0}
                    isOwned={false}
                />

                <Board 
                    imgSrc="https://via.placeholder.com/1050"
                    title="Board Title"
                    author="Author"
                    upvotes={0}
                    isOwned={false}
                />

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
