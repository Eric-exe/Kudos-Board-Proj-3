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
            <div className="row justify-content-center">
                <div className="col-7 pt-4">
                    <input
                        className="form-control bg-light border border-success mb-1"
                        type="text"
                        placeholder="Search boards..."
                    ></input>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
                <button className="btn btn-outline-success mt-1 mx-1" value="All" onClick={handleCategoryClick}>
                    All
                </button>
                <button className="btn btn-outline-success mt-1 mx-1" value="Recent" onClick={handleCategoryClick}>
                    Recent
                </button>
                <button className="btn btn-outline-success mt-1 mx-1" value="Celebration" onClick={handleCategoryClick}>
                    Celebration
                </button>
                <button className="btn btn-outline-success mt-1 mx-1" value="Thank You" onClick={handleCategoryClick}>
                    Thank You
                </button>
                <button className="btn btn-outline-success mt-1 mx-1" value="Inspiration" onClick={handleCategoryClick}>
                    Inspiration
                </button>
            </div>

            <div className="d-flex flex-wrap justify-content-center">
                <button className="btn btn-outline-success mt-1 mx-1" value="Create">
                    Create New Board
                </button>
            </div>
        </>
    );
}

export default BrowseBar;
