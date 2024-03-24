import React from "react";
import {Link} from "react-router-dom";

const SuccessPage = () => {

    return (
        <>
        <h2>Thanks for your support!</h2>
        <Link to={"/"}>
            <button>Return to Homepage</button>
        </Link>
        </>
    )

}

export default SuccessPage;