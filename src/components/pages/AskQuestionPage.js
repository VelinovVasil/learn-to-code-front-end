import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/AskQuestionPage.css';
import NotLoggedIn from "../NotLoggedIn";

const AskQuestionPage = () => {
    const [questionText, setQuestionText] = useState('');
    const [conversationLog, setConversationLog] = useState([]);
    const [isPublished, setIsPublished] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [conversationContext, setConversationContext] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const baseUrl = `http://localhost:8080/api/`;

    // Get userId from localstorage
    const userId = localStorage.getItem("userId");

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
            const obj = JSON.stringify({ content: questionText, userId: userId, role: "USER" });

            const response = await fetch(baseUrl + 'openai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: obj,
            });
            if (!response.ok) {
                throw new Error('Failed to submit question');
            }

            const answerData = await response.json();
            const content = answerData.response.content;

            // Session id:
            localStorage.setItem('sessionId', answerData.sessionId);

            const updatedLog = [...conversationLog, { sender: 'User', message: questionText }, { sender: 'Chatbot', message: content }];
            setConversationLog(updatedLog);
            setConversationContext(answerData.context); // Save the context for continuing conversation

        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const handleContinueConversation = async () => {
        try {
            const token = await getAccessTokenSilently();
            const obj = JSON.stringify({ content: questionText, userId: userId, role: 'User', sessionId: localStorage.getItem('sessionId')});

            const response = await fetch(baseUrl + 'openai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: obj,
            });
            if (!response.ok) {
                throw new Error('Failed to continue conversation');
            }

            const answerData = await response.json();
            const content = answerData.response.content;

            const updatedLog = [...conversationLog, { sender: 'User', message: questionText }, { sender: 'Chatbot', message: content }];
            setConversationLog(updatedLog);
            setConversationContext(answerData.context); // Update the context for future continuation

        } catch (error) {
            console.error('Error continuing conversation:', error);
        }
    };

    const handlePublish = async () => {
        try {
            const token = await getAccessTokenSilently();
            const publishObj = JSON.stringify({ text: questionText, authorId: userId, tagIds: selectedTags, imageUrls: [] });

            const response = await fetch(baseUrl + 'questions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: publishObj,
            });
            if (!response.ok) {
                throw new Error(`Failed to publish question: ${response.status} ${response.statusText}`);
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
        return <NotLoggedIn />
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
                <button id={'btnSubmitQuestion'} onClick={handleQuestionSubmit}>Submit Question</button>
            </section>
            {conversationLog.map((entry, index) => (
                <div key={index}>
                    <p>{entry.sender}: {entry.message}</p>
                </div>
            ))}
            <button onClick={handleContinueConversation}>Continue Conversation</button>
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
            <button onClick={handlePublish}>Publish Question</button>
            <Footer />
        </div>
    );
};

export default AskQuestionPage;
