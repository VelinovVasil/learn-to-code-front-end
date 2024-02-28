import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './styles/NotLoggedIn.css';

const NotLoggedIn = () => {
    const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();

    return (
        <div>
            <Navbar/>
            <div id={'loginMessage'}>
                <h2>Please log in to your account</h2>
                <button onClick={() => loginWithRedirect()}>Log in</button>
            </div>
            <Footer/>
        </div>
    );
}

export default NotLoggedIn;