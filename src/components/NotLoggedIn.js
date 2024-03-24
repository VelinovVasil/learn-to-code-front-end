import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './styles/NotLoggedIn.css';
import LoginButton from "./LoginButton";

const NotLoggedIn = () => {
    const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();

    return (
        <div>
            <div id={'loginMessage'}>
                <h2>Please log in to your account</h2>
                {/*<button onClick={() => loginWithRedirect()}>Log in</button>*/}
                <div id={'loginBtnContainer'}>
                    <LoginButton/>
                </div>
            </div>
        </div>
    );
}

export default NotLoggedIn;