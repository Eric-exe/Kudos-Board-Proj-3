import { useState } from "react";
import "./App.css";
import BrowseBar from "./BrowseBar";
import Board from "./Board";

function App() {
    const [category, setCategory] = useState('All');

    return (
        <>
        <div className="d-flex justify-content-between text-white bg-success px-3 py-2">
            <h2 className="m-0">Kudos Board</h2>
            <button type="button" className="btn btn-outline-light">Guest</button>
        </div>
            <BrowseBar 
                category={[category, setCategory]}
            />
            <Board />
        </>
    );
}

export default App;
