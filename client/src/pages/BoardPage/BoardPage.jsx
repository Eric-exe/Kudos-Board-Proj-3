import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import CreateCardModal from "./components/CreateCardModal";
import Card from "./components/Card"

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
        console.log(props.userData[0])
    }, [currentBoardData]);

    return (
        <>
            {currentBoardData == undefined ? (
                <div>Loading...</div>
            ) : currentBoardData == -1 ? (
                <div>No board found</div>
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

                        <CreateCardModal
                            userData={props.userData}
                            boardId={boardId}
                            currentBoardDataFunc={setCurrentBoardData}
                        />
                    </div>

                    <div className="d-flex flex-wrap row-cols-sm-1 row-cols-md-4 justify-content-center">
                        {
                            currentBoardData["cards"].map((card, index) => {
                                return (
                                    <Card
                                        key={index}
                                        card={card}
                                        userData={props.userData}
                                        isOwned={props.userData[0]["cardsCreated"].some(
                                            (createdCard) => createdCard["id"] === card["id"]
                                        )}
                                    />                                 
                                )
                            })
                        }
                    </div>
                </>
            )}

            {jsonStr}
        </>
    );
}
export default BoardPage;
