import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/AskQuestionPage.css'

const AskQuestionPage = () => {
    const [questionText, setQuestionText] = useState('');
    const [tags, setTags] = useState([]);
    const [answer, setAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate function

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
            const response = await fetch('your-backend-url/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
            const response = await fetch('your-backend-url/questions/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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

    return (
        <div>
            <Navbar />
            <h2>Ask a Question</h2>
            <textarea id={'askQuestionArea'}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type your question here"
                required
            />
            <button onClick={handleQuestionSubmit}>Submit Question</button>

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
