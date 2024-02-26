// import React, { useEffect } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
// import axios from 'axios';
//
// const CallbackPage = () => {
//     const location = useLocation();
//     const history = useHistory();
//
//     useEffect(() => {
//         const handleAuthentication = async () => {
//             try {
//                 // Extract the authorization code from the URL query parameters
//                 const code = new URLSearchParams(location.search).get('code');
//
//                 // Exchange the authorization code for an access token
//                 const response = await axios.post('https://nvd.eu.auth0.com/oauth/token', {
//                     client_id: 'JzuLTdbayWt6ES7vnv0i84k63vqz6UG1',
//                     client_secret: 'eRz-4Fpq3z2lmGUpGnX2O56Mo0mG_8K1vgOlJOR-zA6RITeD8mmqtWBAvDBViLSC',
//                     code,
//                     grant_type: 'authorization_code',
//                     redirect_uri: 'http://localhost:4040/callback',
//                 });
//
//                 // Extract the JWT from the response
//                 const jwt = response.data.access_token;
//
//                 // Store the JWT in localStorage or sessionStorage
//                 localStorage.setItem('jwt', jwt);
//
//                 // Redirect the user to the desired route
//                 history.push('/user');
//             } catch (error) {
//                 console.error('Authentication error:', error);
//                 // Handle authentication errors
//             }
//         };
//
//         handleAuthentication();
//     }, [location.search, history]);
//
//     return <div>Logging in...</div>;
// };
//
// export default CallbackPage;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const CallbackPage = () => {
    const location = useLocation();
    const { isLoading, error, isAuthenticated, getIdTokenClaims } = useAuth0();

    useEffect(() => {
        const handleAuthentication = async () => {
            try {
                if (isLoading) return;
                if (error) {
                    console.error('Authentication error:', error);
                    return;
                }
                if (!isAuthenticated) return;

                // Get ID token claims
                const idTokenClaims = await getIdTokenClaims();

                // Save the JWT to local storage
                localStorage.setItem('jwt', idTokenClaims.__raw);

                // Redirect the user to the desired route
                window.location.href = '/user'; // Redirect using window.location.href
            } catch (error) {
                console.error('Authentication error:', error);
            }
        };

        handleAuthentication();
    }, [isLoading, error, isAuthenticated, getIdTokenClaims]);

    return <div>Logging in...</div>;
};

export default CallbackPage;

