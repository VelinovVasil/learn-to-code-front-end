import React from "react";
import {Link} from "react-router-dom";

const CancelPage = () => {

    return (
        <>
        <h2>Payment cancelled.</h2>
        <Link to={"/"}>
            <button>Return to Homepage</button>
        </Link>
        </>
    )
}

export default CancelPage;