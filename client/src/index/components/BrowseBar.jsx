import { useState, useEffect } from "react";
import propTypes from "prop-types";

BrowseBar.propTypes = {
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
    }, [props.category[0]]);

    // handle the category button click event
    const handleCategoryClick = (event) => {
        props.category[1](event.target.value);
    };

    // handles the creation of a new board
    const [createBoardTitle, setCreateBoardTitle] = useState("");
    const [createBoardImgURL, setCreateBoardImgURL] = useState("");
    const [createBoardCategory, setCreateBoardCategory] = useState("");

    // handle the create board button click event
    const handleCreateBoardClick = (event) => {
        event.preventDefault();
        console.log({ createBoardTitle, createBoardImgURL, createBoardCategory });
        if (createBoardTitle == "" || createBoardImgURL == "" || createBoardCategory == "") {
            return;
        }
        // if successful, close the modal
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
