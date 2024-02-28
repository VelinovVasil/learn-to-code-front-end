import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import React Quill's CSS
import '../styles/AskQuestionPage.css'
import NotLoggedIn from "../NotLoggedIn";

const AskQuestionPage = () => {
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate function
    const { isAuthenticated, getAccessTokenSilently } = useAuth0(); // Destructure isAuthenticated and getAccessTokenSilently from useAuth0 hook

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await fetch('your-backend-url/tags');
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            const data = await response.json();
            setAllTags(data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const handleQuestionSubmit = async () => {
        try {
            const token = await getAccessTokenSilently(); // Get the access token
            const response = await fetch('your-backend-url/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the access token in the authorization header
                },
                body: JSON.stringify({ text: questionText }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit question');
            }
            const answerData = await response.json();
            setAnswer(answerData.answer);
            setIsAnswered(true);
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const handlePublish = async () => {
        try {
            const token = await getAccessTokenSilently(); // Get the access token
            const response = await fetch('your-backend-url/questions/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the access token in the authorization header
                },
                body: JSON.stringify({ text: questionText, tags: selectedTags }),
            });
            if (!response.ok) {
                throw new Error('Failed to publish question');
            }
            setIsPublished(true);
            // Redirect to the forum page after publishing
            navigate('/forum'); // Use navigate function to redirect
        } catch (error) {
            console.error('Error publishing question:', error);
        }
    };

    if (!isAuthenticated) {
        // Redirect the user to the login page if not authenticated
        return <NotLoggedIn/>
    }

    return (
        <div id={'askQuestionPage'}>
            <Navbar />
            <h2>Ask a Question</h2>
            <section>
                <ReactQuill
                    id={'askQuestionArea'}
                    value={questionText}
                    onChange={(value) => setQuestionText(value)}
                    placeholder="Type your question here"
                />
                <button onClick={handleQuestionSubmit}>Submit Question</button>
            </section>
            {isAnswered && (
                <div>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                    <button onClick={handlePublish}>Publish Question</button>
                </div>
            )}

            {isPublished && (
                <div>
                    <h3>Question Published!</h3>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AskQuestionPage;
