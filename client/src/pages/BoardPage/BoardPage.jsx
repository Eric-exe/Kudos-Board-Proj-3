import propTypes from "prop-types";
import { useParams } from 'react-router-dom';

BoardPage.propTypes = {
    userData: propTypes.array.isRequired,
}

function BoardPage(props) {
    const { boardId } = useParams();

    return (
        <div>
        <h1>{boardId}</h1>
        </div>
    );
}
export default BoardPage;
