import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, getIdTokenClaims } = useAuth0();

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