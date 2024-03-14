import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/AskQuestionPage.css'
import NotLoggedIn from "../NotLoggedIn";

// TODO: fix publishQuestion (error 400)

const AskQuestionPage = () => {
    const [questionText, setQuestionText] = useState('');
    const [messageDiv, setAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();


    const baseUrl = `http://localhost:8080/api/`;

    //Get userId from localstorage
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

            // const userId = localStorage.getItem("userId");
            console.log(userId);

            const obj = JSON.stringify({content: questionText, userId: userId, role: "USER"});
            console.log(obj);

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

            console.log(content);

            // Check if the content has code block
            const hasCodeBlock = content.includes("```");
            let formattedContent = content;

            if (hasCodeBlock) {
                // If the content has code block, wrap it in a <pre><code> element
                formattedContent = content.replace(/```([\s\S]+?)```/g, '</p><pre><code>$1</code></pre><p>');
            }

            setAnswer(formattedContent);
            setIsAnswered(true);

        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const handlePublish = async () => {
        try {

            console.log('Selected tags: ');
            console.log(selectedTags);
            console.log(`Question text: ${questionText}`);
            console.log(`userId: ${userId}`);

            const token = await getAccessTokenSilently();

            const publishObj = JSON.stringify({ text: questionText, authorId: userId, tagIds: selectedTags, imageUrls: []});

            console.log('Object to publish: ');
            console.log(publishObj);

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
                <button id={'btnSubmitQuestion'} onClick={handleQuestionSubmit}>Submit Question</button>
            </section>
            {isAnswered && (
                <div id={'aiAnswer'}>
                    <h3>AI Answer:</h3>
                    {/* Render the content as HTML string */}
                    <div dangerouslySetInnerHTML={{ __html: messageDiv }} />
                    <button id={'btnPublishQuestion'} onClick={handlePublish}>Publish Question</button>
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
