import { useEffect } from "react";
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
            }
            else {
                button.classList.remove("active");
            }
        });
    }, [props.category[0]]);

    // handle the button click event
    const handleCategoryClick = (event) => {
        props.category[1](event.target.value);
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
                <button className="btn btn-outline-primary mx-1 my-1" data-bs-toggle="modal" data-bs-target="#createBoardModal">
                    Create New Board
                </button>
            </div>
            {/* Modal for the create board button */}
            <div className="modal fade"  id="createBoardModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">Create Board</div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            Hello world
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BrowseBar;
