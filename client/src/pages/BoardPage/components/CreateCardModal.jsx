import { useState } from 'react'
import './CreateCardModal.css'
import API from '../../../api'
import propTypes from 'prop-types'

CreateCardModal.propTypes = {
    userData: propTypes.array.isRequired,
    boardId: propTypes.string.isRequired,
    currentBoardDataFunc: propTypes.func.isRequired
}

function CreateCardModal(props) {
    const [cardContent, setCardContent] = useState("")
    const [GIFsData, setGIFsData] = useState(undefined)
    const [GIFUrl, setGIFUrl] = useState("")
    const [cardSigned, setCardSigned] = useState(false)

    let searchDebounceTimer = null;
    const debounce = (func, delay) => {
        return (...args) => {
            if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => func(...args), delay);
        };
    };

    // handle the search bar update event, using debounce to prevent spamming API
    const handleSearchGIFChange = (event) => {
        const debouncedSearchFn = debounce(() => {
            if (event.target.value == "") {
                return;
            }
            API.getGIFsData(setGIFsData, event.target.value)
        }, 200);
        debouncedSearchFn();
    };

    const handleCreateCard = async () => {
        await API.createCard(props.userData[0]["id"], props.boardId, cardContent, GIFUrl, cardSigned);
        API.getBoardData(props.currentBoardDataFunc, props.boardId);
        bootstrap.Modal.getInstance(document.getElementById("createCardModal")).hide();
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#createCardModal">
                    Create New Card
                </button>
            </div>

            <div className="modal fade" id="createCardModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create New Card</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Card Message:
                            <textarea className="form-control" id="cardContentBox" rows="3" value={cardContent} onChange={(event) => setCardContent(event.target.value)}></textarea>
                            <div className="row mt-2 align-items-center">
                                <div className="col-3">Search GIPHY:</div>
                                <div className="col-9">
                                    <input type="text" className="form-control" id="gifphySearchBar" onChange={handleSearchGIFChange}></input>
                                </div>
                            </div>

                            <div className="row-cols-5 gifsContainer">
                            {
                                GIFsData == undefined ? 
                                <></>
                                :
                                GIFsData["data"].map((gif, index) => {
                                    return (
                                        <img key={index} className="gif" src={gif["images"]["original"]["url"]} onClick={(event) => setGIFUrl(event.target.src)}/>
                                    )
                                })
                            }    
                            </div>

                            <div className="row mt-2 align-items-center">
                                <div className="col-3">GIPHY URL:</div>
                                <div className="col-9">
                                    <input type="text" className="form-control" id="gifphyUrlBar" value={GIFUrl} onChange={(event) => setGIFUrl(event.target.value)}></input>
                                </div>
                            </div>
                            
                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" id="signToggle" onChange={(event) => setCardSigned(event.target.checked)}/>
                                <label className="form-check-label" htmlFor="signToggle">Sign Card</label>
                            </div>
                        </div>
                    
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" onClick={handleCreateCard}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCardModal;