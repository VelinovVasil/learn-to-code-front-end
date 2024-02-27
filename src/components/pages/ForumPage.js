import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import '../styles/ForumPage.css';
import Footer from "../Footer";
import { Link } from "react-router-dom";

const ForumPage = () => {
    const [questions, setQuestions] = useState([]);
    const [sortBy, setSortBy] = useState('datePublished');
    const [showReplyForm, setShowReplyForm] = useState(false); // State variable to control the visibility of the reply form
    const [replyText, setReplyText] = useState(''); // State variable to store the reply text
    const [authorInfo, setAuthorInfo] = useState(null); // State variable to store the author information

    // Define the URL for fetching questions
    const url = `insert_url_here?sortBy=${sortBy}`; // Replace 'insert_url_here' with your actual API endpoint

    const fetchQuestions = async () => {
        try {
            const response = await fetch(url, {
                // Add headers for authentication if needed
                headers: {
                    // Include the JWT token from localStorage
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions, url]);

    useEffect(() => {
        // Retrieve JWT from local storage
        const jwt = localStorage.getItem('jwt');

        // Decode JWT to access its payload
        const decodedJwt = jwt ? JSON.parse(atob(jwt.split('.')[1])) : null;

        // Set author information from JWT payload
        if (decodedJwt) {
            setAuthorInfo({
                userId: decodedJwt.userId,
                userEmail: decodedJwt.email,
                // You can extract other user information as needed
            });
        }
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleReplyButtonClick = () => {
        setShowReplyForm(true); // Display the reply form when the "Reply" button is clicked
    };

    const handleReplyFormSubmit = (e) => {
        e.preventDefault();
        // Call replyToQuestion function with questionId and replyText
        // Reset reply text and hide the reply form after submission
        replyToQuestion(questionId, replyText);
        setReplyText('');
        setShowReplyForm(false);
    };

    const replyToQuestion = async (questionId, replyText) => {
        try {
            const response = await fetch(`your-backend-url/questions/${questionId}/replies`, {
                method: 'POST',
                headers: {
                    // Include the JWT token from localStorage
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: replyText, author: authorInfo }), // Include author information in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to submit reply');
            }

            // Refresh questions after successful submission
            fetchQuestions();
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <header id={'forumHeader'}>
                <section className={'headerAskBtn'}>
                    <h2 id="forumTitle">Forum</h2>
                    <Link to={'/ask-question'}>
                        <button id={'btnAddQuestion'}>Ask a question</button>
                    </Link>
                </section>
                <section id="forumFilter">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="datePublished">Date Published</option>
                        <option value="author">Author</option>
                    </select>
                    {/*Todo: add filter section*/}
                </section>
            </header>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <h3>{question.text}</h3>
                        <p>Author: {question.author.name}</p>
                        <p>Date Published: {question.datePublished}</p>
                        <p>Tags: {question.tags.join(', ')}</p>
                        <button onClick={handleReplyButtonClick}>
                            Reply
                        </button>
                        {showReplyForm && (
                            <form onSubmit={handleReplyFormSubmit}>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your reply here"
                                    required
                                />
                                <button type="submit">Submit Reply</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default ForumPage;
