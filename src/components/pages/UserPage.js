import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "../LoginButton";
import NotLoggedIn from "../NotLoggedIn";

const UserPage = () => {
    const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [userData, setUserData] = useState(null);
    const [askedQuestions, setAskedQuestions] = useState([]);
    const [publishedAnswers, setPublishedAnswers] = useState([]);

    const baseUrl = `http://localhost:8080/api/`;

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

            console.log("user email:");
            console.log(userEmail); // This will log the user's email

            const response = await fetch(baseUrl + 'users/email/' + userEmail, {
                headers: {
                    // Authorization: `Bearer ${token}`,
                    'Content-Type': 'Application/JSON'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const userData = await response.json();

            console.log('user data:');
            console.log(userData);

            setUserData(userData);

            const userId = userData.id;
            console.log('UserId:');
            console.log(userId);

            localStorage.setItem('userId', userId); // Save userId to localstorage

            // Fetch asked questions
            const askedQuestionsResponse = await fetch(`${baseUrl}users/questions/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            
            const askedQuestionsData = await askedQuestionsResponse.json();

            console.log('Asked questions:');
            console.log(askedQuestionsData);

            setAskedQuestions(askedQuestionsData);

            // Fetch published answers
            const publishedAnswersResponse = await fetch(`your-backend-url/answers?userId=${user.sub}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const publishedAnswersData = await publishedAnswersResponse.json();
            setPublishedAnswers(publishedAnswersData);
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

                    <h3>Published Answers:</h3>
                    <ul>
                        {publishedAnswers.map((answer) => (
                            <li key={answer.id}>{answer.text}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default UserPage;
