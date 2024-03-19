import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "../LoginButton";
import NotLoggedIn from "../NotLoggedIn";
import {getQuestionsByUserId, getUserByEmail} from "../../services/userService";

const UserPage = () => {
    const { isAuthenticated, user, getAccessTokenSilently} = useAuth0();
    const [userData, setUserData] = useState(null);
    const [askedQuestions, setAskedQuestions] = useState([]);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchData();
        }
    }, [isAuthenticated, user]);

    const fetchData = async () => {
        try {
            const token = await getAccessTokenSilently();

            const jwt = localStorage.getItem('jwt');

            // Decode the JWT
            const base64Url = jwt.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(base64));

            // Retrieve the email field from the payload
            const userEmail = decodedPayload.email;

            const userData = await getUserByEmail(userEmail);

            setUserData(userData);

            const userId = userData.id;

            localStorage.setItem('userId', userId); // Save userId to localstorage

            
            const askedQuestionsData = await getQuestionsByUserId(token, userId);

            setAskedQuestions(askedQuestionsData);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div>
                <div>
                    {/*<h2>Please log in to your account</h2>*/}
                    {/*<button onClick={() => loginWithRedirect()}>Log in</button>*/}
                    <NotLoggedIn/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            {isAuthenticated && user && userData && (
                <div>
                    <h2>Welcome back!</h2>
                    <h3>User Information:</h3>
                    <p>Username {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Nickname: {user.nickname}</p>
                    {/* Display other user information as needed */}

                    <h3>Asked Questions:</h3>
                    <ul>
                        {askedQuestions.map((question) => (
                            <li key={question.id}>{question.text}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default UserPage;
