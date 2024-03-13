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
    const [authors, setAuthors] = useState({});
    const [tags, setTags] = useState({});


    const baseUrl = `http://localhost:8080/api/`;

    // TODO: display edit button
    // TODO: fix reply functionality

    const fetchQuestions = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token);

            console.log(localStorage.getItem('jwt'));

            const response = await fetch(baseUrl + 'questions/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();

            for (const question of data) {
                const authorId = question.authorId;

                console.log('authorId:');
                console.log(authorId);

                // Fetch author info if not already fetched
                if (!authors[authorId]) {
                    try {
                        const userResponse = await fetch(baseUrl + `users/${authorId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        });
                        if (!userResponse.ok) {
                            throw new Error('Failed to fetch author');
                        }

                        const authorInfo = await userResponse.json();

                        console.log('Author info: ');
                        console.log(authorInfo);

                        // Update authors state with author info
                        setAuthors(prevState => ({
                            ...prevState,
                            [authorId]: authorInfo
                        }));
                    } catch (error) {
                        console.error('Error fetching author:', error);
                    }
                }

                // Fetch tags for each question
                for (const tagId of question.tagIds) {
                    if (!tags[tagId]) {
                        try {
                            const tagResponse = await fetch(baseUrl + `tags/${tagId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            });
                            if (!tagResponse.ok) {
                                throw new Error('Failed to fetch tag');
                            }

                            const tagInfo = await tagResponse.json();

                            console.log('Tag info: ');
                            console.log(tagInfo);

                            // Update tags state with tag info
                            setTags(prevState => ({
                                ...prevState,
                                [tagId]: tagInfo
                            }));
                        } catch (error) {
                            console.error('Error fetching tag:', error);
                        }
                    }
                }
            }

            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };




    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions, baseUrl + 'questions/']);

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
            const response = await fetch(baseUrl + `questions/${questionId}/replies`, {
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
                method: 'PUT',
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

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
                {/*<section id="forumFilter">*/}
                {/*    <label>Sort by:</label>*/}
                {/*    <select value={sortBy} onChange={handleSortChange}>*/}
                {/*        <option value="datePublished">Date Published</option>*/}
                {/*        <option value="author">Author</option>*/}
                {/*    </select>*/}
                {/*</section>*/}
            </header>
            <ul>
                {questions.map((question) => (
                    <li key={question && question.id} className={'questionLi'}>
                        {question && question.id ? (
                            <div>
                                {question.isEditing ? (
                                    // Editing mode
                                    <div>
                                        <input
                                            type="text"
                                            value={editedQuestionText}
                                            onChange={(e) => setEditedQuestionText(e.target.value)}
                                        />
                                        <button onClick={() => handleSaveEdit(question.id)}>Save</button>
                                    </div>
                                ) : (
                                    // Viewing mode
                                    <div className={'questionContainer'}>
                                        <h3>{question.text}</h3>
                                        {/* Display author name if authorInfo is available */}
                                        {authors[question.authorId] && (
                                            <p className={'authorName'}>Author: {authors[question.authorId].nickname}</p>
                                        )}
                                        {/* Render tags */}
                                        <p>Tags: {question.tagIds && question.tagIds.map(tagId => (
                                            tags[tagId] ? tags[tagId].name : ''
                                        )).join(', ')}</p>
                                        <p>Date Published: {question.datePublished && formatDate(question.datePublished)}</p>
                                        <div className={'questionButtons'}>
                                            <button onClick={() => handleReplyButtonClick(question.id)}>Reply</button>
                                            {/* Render edit button only if the authorInfo exists and the question's author matches the logged-in user */}
                                            {authorInfo && authors[question.authorId] && authorInfo.userId === authors[question.authorId].userId && (
                                                <button onClick={() => handleEditQuestion(question.id)}>Edit</button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </li>
                ))}



            </ul>
            <Footer />
        </div>
    );
}

export default ForumPage;
