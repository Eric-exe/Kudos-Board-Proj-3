import { useState, useEffect } from "react";

function App() {
    const [boardID, setBoardID] = useState(-1);

    useEffect(() => {
        const url = window.location.search;
        const params = new URLSearchParams(url);
        setBoardID(params.get("id"));
    }, []);
    return (<>{boardID}</>);
}

export default App;
