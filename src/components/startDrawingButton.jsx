import {Link} from "react-router-dom";

function StartDrawing() {
    return (
            <Link to = "/draw" className = "startDrawButton">
                <button type = "button" className = "startDrawButton">Start Drawing Now!</button>
            </Link>
        
        
    )
}

export default StartDrawing;