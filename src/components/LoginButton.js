import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

    const baseUrl = `http://localhost:8080/api/`;

    // TODO: save user id to localstorage

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: {
                audience: "https://hello-world.example.com"
            }
        })
    }

    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
        localStorage.removeItem('jwt'); // Remove JWT from local storage on logout
        localStorage.removeItem('userId');
    }

    const handleLoginOrOut = async () => {
        if (isAuthenticated) {
            handleLogout();
        } else {
            await handleLogin();
        }
    }

    const saveTokenToLocalStorage = async () => {
        try {
            const tokenClaims = await getIdTokenClaims();
            localStorage.setItem('jwt', tokenClaims.__raw); // Save JWT to local storage

            // const token = await getAccessTokenSilently();
            //
            // const jwt = localStorage.getItem('jwt');
            //
            // // Decode the JWT
            // const base64Url = jwt.split('.')[1];
            // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            // const decodedPayload = JSON.parse(atob(base64));
            //
            // // Retrieve the email field from the payload
            // const userEmail = decodedPayload.email;
            //
            // const response = await fetch(baseUrl + 'users/email/' + userEmail, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //         'Content-Type': 'application/json',
            //     },
            // });
            // if (!response.ok) {
            //     throw new Error('Failed to fetch user info');
            // }
            // const userInfo = await response.json();
            //
            // // console.log('UserInfo: ');
            // // console.log(userInfo);
            // //
            // // console.log('UserId:');
            // // console.log(userInfo.id);
            //
            // localStorage.setItem('userId', userInfo.id);
            //
            // console.log('set');

        } catch (error) {
            console.error("Error saving token to local storage:", error);
        }
    }

    return (
        <h4
            id="sign-in"
            style={{ fontSize: '1.3em' }}
            onClick={async () => {
                await handleLoginOrOut();
                if (isAuthenticated) {
                    await saveTokenToLocalStorage();
                }
            }}
        >
            {isAuthenticated ? "Log out" : "Log in"}
        </h4>
    );
};

export default LoginButton;