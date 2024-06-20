import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import CreateCardModal from "./components/CreateCardModal";

BoardPage.propTypes = {
    userData: propTypes.array.isRequired,
};

function BoardPage(props) {
    const { boardId } = useParams();

    const [currentBoardData, setCurrentBoardData] = useState(undefined);
    const [jsonStr, setJsonStr] = useState("");
    // fetch the latest board data on init
    useEffect(() => {
        API.getBoardData(setCurrentBoardData, boardId);
    }, []);

    useEffect(() => {
        setJsonStr(JSON.stringify(currentBoardData));
    }, [currentBoardData]);

    return (
        <>
            {currentBoardData == undefined ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="">
                        <div className="d-flex flex-wrap align-items-center justify-content-center mt-4">
                            <h2 className="d-inline-block align m-0">{currentBoardData["title"]}</h2>
                            &nbsp;
                            <span className="d-inline-block badge bg-secondary">{currentBoardData["category"]}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={currentBoardData["imgUrl"]} className="mw-75" alt="board-img" />
                        </div>
                        <h5 className="text-center">By: {currentBoardData["author"]["username"]}</h5>

                        <CreateCardModal/>
                    </div>
                </>
            )}

            {jsonStr}
        </>
    );
}
export default BoardPage;
