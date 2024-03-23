import React from "react";

export const PageLoader = () => {
    const loadingSvg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

    return (
        <div className="loader">
            <img src={loadingSvg} alt="Loading..." />
        </div>
    );
};
