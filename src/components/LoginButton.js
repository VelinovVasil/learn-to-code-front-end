import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <h4 id={'sign-in'} onClick={() => loginWithRedirect()}>Log in</h4>;
};

export default LoginButton;