function BrowseBar() {
    return (
        <>
            <div className='row justify-content-center'>
                <div className='col-6 pt-4 pb-2'>
                    <input className="form-control bg-light border border-success" type="text" placeholder="Search boards..."></input>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='d-flex col-6 justify-content-center overflow-scroll'>
                    <button className='btn btn-outline-success mx-2'>All</button>
                    <button className='btn btn-outline-success mx-2'>Recent</button>
                    <button className='btn btn-outline-success mx-2'>Celebration</button>
                    <button className='btn btn-outline-success mx-2'>Thank You</button>
                    <button className='btn btn-outline-success mx-2'>Inspiration</button>
                </div>
            </div>
        </>
    )
}

export default BrowseBar