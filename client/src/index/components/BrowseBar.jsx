import { useState, useEffect } from "react";
import propTypes from "prop-types";
import API from "../../api";

BrowseBar.propTypes = {
    userData: propTypes.array.isRequired,
    boardDataFunc: propTypes.func.isRequired,
    category: propTypes.array.isRequired, // 0 -> value, 1 -> function
};

function BrowseBar(props) {
    // update the active button
    useEffect(() => {
        const buttons = document.querySelectorAll(".btn");
        buttons.forEach((button) => {
            if (button.value == props.category[0]) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        // send an API request to get the filtered board data
        if (props.category[0] == "All") {
            API.getBoardData(props.boardDataFunc);
        }
        else if (props.category[0] == "Recent") {
            API.getFilteredBoardData(props.boardDataFunc, {"recent": true});
        }
        else if (props.category[0] == "Created") {
            API.getFilteredBoardData(props.boardDataFunc, {"authorId": props.userData[0]["id"]});
        }
        else {
            // category
            API.getFilteredBoardData(props.boardDataFunc, {"category": props.category[0]});
        }

    }, [props.category[0]]);

    // handle the category button click event
    const handleCategoryClick = (event) => {
        props.category[1](event.target.value);
    };

    // debounce fn: https://www.inkoop.io/blog/debounce-and-throttle-javascript-edition/
    let searchDebounceTimer = null;
    const debounce = (func, delay) => {
        return (...args) => {
            if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => func(...args), delay);
        }
    }

    // handle the search bar update event, using debounce to prevent spamming API
    const handleSearchBarUpdate = (event) => {
        const debouncedSearchFn = debounce(() => {
            console.log("searching for: " + event.target.value);
            API.getFilteredBoardData(props.boardDataFunc, { title: event.target.value });
        }, 300);
    
        debouncedSearchFn();
    };

    // handles the creation of a new board
    const [createBoardTitle, setCreateBoardTitle] = useState("");
    const [createBoardImgURL, setCreateBoardImgURL] = useState("");
    const [createBoardCategory, setCreateBoardCategory] = useState("");

    // handle the create board button click event
    const handleCreateBoardClick = (event) => {
        event.preventDefault();
        // sanity check: bad input
        if (createBoardTitle == "" || createBoardImgURL == "" || createBoardCategory == "") {
            return;
        }

        API.createBoard(
            props.boardDataFunc,
            props.userData[0]["id"],
            createBoardTitle,
            createBoardImgURL,
            createBoardCategory
        );
        
        // cleanup
        setCreateBoardTitle("");
        setCreateBoardImgURL("");
        setCreateBoardCategory("");
        document.getElementById("createBoard-category").selectedIndex = 0;
        bootstrap.Modal.getInstance(document.getElementById("createBoardModal")).hide();
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-7 pt-4">
                    <input
                        className="form-control bg-light border border-primary mb-1"
                        type="text"
                        placeholder="Search boards..."
                        onChange={handleSearchBarUpdate}
                    ></input>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
                <button className="btn btn-outline-primary mt-1 mx-1" value="All" onClick={handleCategoryClick}>
                    All
                </button>

                <button className="btn btn-outline-primary mt-1 mx-1" value="Recent" onClick={handleCategoryClick}>
                    Recent
                </button>

                <button className="btn btn-outline-primary mt-1 mx-1" value="Celebration" onClick={handleCategoryClick}>
                    Celebration
                </button>

                <button className="btn btn-outline-primary mt-1 mx-1" value="Thank You" onClick={handleCategoryClick}>
                    Thank You
                </button>

                <button className="btn btn-outline-primary mt-1 mx-1" value="Inspiration" onClick={handleCategoryClick}>
                    Inspiration
                </button>

                <button className="btn btn-outline-primary mt-1 mx-1" value="Created" onClick={handleCategoryClick}>
                    Created
                </button>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
                <button
                    className="btn btn-outline-primary mx-1 my-1"
                    data-bs-toggle="modal"
                    data-bs-target="#createBoardModal"
                >
                    Create New Board
                </button>
            </div>
            {/* Modal for the create board button */}
            <div className="modal fade" id="createBoardModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">Create Board</div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <form>
                            <div className="modal-body">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-2">Board Title:</div>
                                    <div className="col-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="createBoard-title"
                                            value={createBoardTitle}
                                            onChange={() => setCreateBoardTitle(event.target.value)}
                                        ></input>
                                    </div>
                                </div>

                                <div className="row mb-3 align-items-center">
                                    <div className="col-2">Image URL:</div>
                                    <div className="col-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="createBoard-imgUrl"
                                            value={createBoardImgURL}
                                            onChange={() => setCreateBoardImgURL(event.target.value)}
                                        ></input>
                                    </div>
                                </div>

                                <div className="row mb-3 align-items-center">
                                    <div className="col-2">Category:</div>
                                    <div className="col-10">
                                        <select
                                            id="createBoard-category"
                                            className="form-select"
                                            onChange={() => setCreateBoardCategory(event.target.value)}
                                        >
                                            <option selected disabled>
                                                Choose a category
                                            </option>
                                            <option>Celebration</option>
                                            <option>Thank You</option>
                                            <option>Inspiration</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleCreateBoardClick}
                                ></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BrowseBar;
