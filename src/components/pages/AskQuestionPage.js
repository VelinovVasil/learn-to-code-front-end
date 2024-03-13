import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/AskQuestionPage.css'
import NotLoggedIn from "../NotLoggedIn";

const AskQuestionPage = () => {
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const baseUrl = `http://localhost:8080/api/`;

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(baseUrl + 'tags/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

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
            const token = await getAccessTokenSilently();
            const response = await fetch(baseUrl + 'chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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
            const token = await getAccessTokenSilently();
            const response = await fetch(baseUrl + 'questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: questionText, tags: selectedTags }),
            });
            if (!response.ok) {
                throw new Error('Failed to publish question');
            }
            setIsPublished(true);
            navigate('/forum');
        } catch (error) {
            console.error('Error publishing question:', error);
        }
    };

    const handleTagClick = (tagId) => {
        setSelectedTags(prevTags => {
            // Toggle the tag selection
            if (prevTags.includes(tagId)) {
                return prevTags.filter(id => id !== tagId);
            } else {
                return [...prevTags, tagId];
            }
        });
    };

    if (!isAuthenticated) {
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
            <div>
                <h3>Tags:</h3>
                <div className="tags-container">
                    {allTags.map(tag => (
                        <button
                            key={tag.id}
                            className={selectedTags.includes(tag.id) ? 'selected' : ''}
                            onClick={() => handleTagClick(tag.id)}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AskQuestionPage;
