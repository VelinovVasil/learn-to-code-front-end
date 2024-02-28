import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import '../styles/ForumPage.css';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

const ForumPage = () => {
    const [questions, setQuestions] = useState([]);
    const [sortBy, setSortBy] = useState('datePublished');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [authorInfo, setAuthorInfo] = useState(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [editedQuestionText, setEditedQuestionText] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    const url = `insert_url_here?sortBy=${sortBy}`;

    const fetchQuestions = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
        const fetchUserInfo = async () => {
            try {
                const token = await getAccessTokenSilently();
                const userInfo = await fetchUserInfoFromBackend(token);
                setAuthorInfo({
                    userId: userInfo.sub, // Assuming Auth0 user ID is stored in sub field
                    userEmail: userInfo.email,
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [getAccessTokenSilently]);

    const fetchUserInfoFromBackend = async (token) => {
        try {
            const response = await fetch('your-backend-url/userinfo', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user info from backend:', error);
            throw error;
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleReplyButtonClick = (questionId) => {
        setSelectedQuestionId(questionId);
        setShowReplyForm(true);
    };

    const handleReplyFormSubmit = (e) => {
        e.preventDefault();
        replyToQuestion(selectedQuestionId, replyText);
        setReplyText('');
        setShowReplyForm(false);
    };

    const replyToQuestion = async (questionId, replyText) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`your-backend-url/questions/${questionId}/replies`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: replyText, author: authorInfo }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit reply');
            }

            fetchQuestions();
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    const handleEditQuestion = (questionId) => {
        const updatedQuestions = questions.map((question) => {
            if (question.id === questionId) {
                return { ...question, isEditing: true };
            }
            return question;
        });
        setQuestions(updatedQuestions);
    };

    const handleSaveEdit = async (questionId) => {
        try {
            const token = await getAccessTokenSilently();
            // Update the question text in the backend
            const response = await fetch(`your-backend-url/questions/${questionId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: editedQuestionText }),
            });

            if (!response.ok) {
                throw new Error('Failed to update question');
            }

            // Update the question in the local state
            const updatedQuestions = questions.map((question) => {
                if (question.id === questionId) {
                    return { ...question, text: editedQuestionText, isEditing: false };
                }
                return question;
            });
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error('Error updating question:', error);
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
                </section>
            </header>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedQuestionText}
                                    onChange={(e) => setEditedQuestionText(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(question.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{question.text}</h3>
                                <p>Author: {question.author.name}</p>
                                <p>Date Published: {question.datePublished}</p>
                                <p>Tags: {question.tags.join(', ')}</p>
                                <button onClick={() => handleReplyButtonClick(question.id)}>Reply</button>
                                {/* Render edit button only if the authorInfo exists and the question's author matches the logged-in user */}
                                {authorInfo && authorInfo.userId === question.author.id && (
                                    <button onClick={() => handleEditQuestion(question.id)}>Edit</button>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default ForumPage;
