import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "../LoginButton";

const UserPage = () => {
    const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [userData, setUserData] = useState(null);
    const [askedQuestions, setAskedQuestions] = useState([]);
    const [publishedAnswers, setPublishedAnswers] = useState([]);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchData();
        }
    }, [isAuthenticated, user]);

    const fetchData = async () => {
        try {
            const token = await getAccessTokenSilently();
            // Fetch user data from backend using the user sub (subject) ID
            const userDataResponse = await fetch(`your-backend-url/user/${user.sub}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userData = await userDataResponse.json();
            setUserData(userData);

            // Fetch asked questions
            const askedQuestionsResponse = await fetch(`your-backend-url/questions?userId=${user.sub}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const askedQuestionsData = await askedQuestionsResponse.json();
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
                <Navbar />
                <div>
                    <h2>Please log in to your account</h2>
                    <button onClick={() => loginWithRedirect()}>Log in</button>
                </div>
                <Footer />
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
                    <p>Email: {user.email}</p>
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
