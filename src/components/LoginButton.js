import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <h4 id={'sign-in'} style={{ fontSize: '1.3em' }} onClick={() => isAuthenticated ? logout({ returnTo: window.location.origin }) : loginWithRedirect()}>
            {isAuthenticated ? "Log out" : "Log in"}
        </h4>
    );
};

export default LoginButton;
