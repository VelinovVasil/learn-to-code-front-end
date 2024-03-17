import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth0 } from "@auth0/auth0-react";

const QuestionPage = () => {
    const baseUrl = `http://localhost:8080/api/`;

    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplyToAReplyForm, setShowReplyToAReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyToAReplyText, setReplyToAReplyText] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const [replyButtonClicked, setReplyButtonClicked] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [replyToReplyButtonClicked, setReplyToReplyButtonClicked] = useState(false);
    const [replyToReplyId, setReplyToReplyId] = useState(null);

    const question = JSON.parse(localStorage.getItem('question'));
    const tags = JSON.parse(localStorage.getItem('tags'));

    const fetchReplies = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(baseUrl + `replies/question/${question.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            let data = await response.json();

            data = await Promise.all(data.map(async reply => {
                const authorResponse = await fetch(baseUrl + `users/${reply.authorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const author = await authorResponse.json();

                // Update the authorName for the reply
                const updatedReply = { ...reply, authorName: author.nickname };

                // Fetch author information for nested replies
                if (updatedReply.childReplies.length > 0) {
                    updatedReply.childReplies = await fetchNestedReplies(updatedReply.childReplies, token);
                }

                return updatedReply;
            }));

            setReplies(data);
            setShowReplies(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchNestedReplies = async (replies, token) => {
        return await Promise.all(replies.map(async reply => {
            const authorResponse = await fetch(baseUrl + `users/${reply.authorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const author = await authorResponse.json();

            // Update the authorName for the nested reply
            const updatedReply = { ...reply, authorName: author.nickname };

            // Fetch author information for nested replies recursively
            if (updatedReply.childReplies.length > 0) {
                updatedReply.childReplies = await fetchNestedReplies(updatedReply.childReplies, token);
            }

            return updatedReply;
        }));
    };

    const handleReply = async () => {
        setShowReplyForm(!showReplyForm);
        setReplyButtonClicked(!replyButtonClicked);
    };

    const handleReplyToAReply = (replyId) => {
        setShowReplyToAReplyForm(!showReplyToAReplyForm);
        setReplyToReplyButtonClicked(!replyToReplyButtonClicked);
        setReplyToReplyId(replyId);
    };

    const handleEdit = () => {
        setEditButtonClicked(!editButtonClicked);
    };

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(baseUrl + `replies/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    authorId: localStorage.getItem('userId'),
                    text: replyText,
                    questionId: question.id,
                }),
            });
            const data = await response.json();
            setReplyText('');
            setShowReplyForm(false);
            fetchReplies();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmitReplyToAReply = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(baseUrl + `replies/${replyToReplyId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    authorId: localStorage.getItem('userId'),
                    text: replyToAReplyText,
                    questionId: question.id,
                }),
            });
            const data = await response.json();
            setReplyToAReplyText('');
            setShowReplyToAReplyForm(false);
            fetchReplies();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDiscardReply = () => {
        setShowReplyForm(false);
        setReplyButtonClicked(false);
    };

    const handleDiscardEdit = () => {
        setEditButtonClicked(false);
    };

    const handleDiscardReplyToAReply = () => {
        setShowReplyToAReplyForm(false);
        setReplyToReplyButtonClicked(false);
    };

    const renderReplies = (replies, level = 0) => {
        return replies.map(reply => (
            <div key={reply.id} style={{ marginLeft: level * 20 }}>
                <p>{reply.text}</p>
                <p>Author: {reply.authorName}</p>
                <p>Date Published: {reply.dateOfCreation}</p>
                <button onClick={() => handleReplyToAReply(reply.id)}>{replyToReplyButtonClicked ? 'Discard Reply to Reply' : 'Reply to Reply'}</button>
                {replyToReplyButtonClicked && <button onClick={handleDiscardReplyToAReply}>Discard Reply to Reply</button>}
                {showReplyToAReplyForm && (
                    <div>
                        <textarea value={replyToAReplyText} onChange={e => setReplyToAReplyText(e.target.value)} />
                        <button onClick={handleSubmitReplyToAReply}>Submit Reply</button>
                    </div>
                )}
                {reply.childReplies.length > 0 && renderReplies(reply.childReplies, level + 1)}
            </div>
        ));
    };

    return (
        <>
            <Navbar />
            <div className="question-details">
                <div dangerouslySetInnerHTML={{ __html: question.text }} />
                <p>Author: {question.authorName}</p>
                <p>Date Published: {question.datePublished}</p>
                <p>Tags: {question.tagIds.map(tagId => tags[tagId].name).join(', ')}</p>
                <button onClick={handleEdit}>{editButtonClicked ? 'Discard Edit' : 'Edit Question'}</button>
                <button onClick={handleReply}>{replyButtonClicked ? 'Discard Reply' : 'Reply to Question'}</button>
                {showReplyForm && <button onClick={handleDiscardReply}>Discard Reply</button>}
                {showReplyForm && (
                    <div>
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} />
                        <button onClick={handleSubmitReply}>Submit Reply</button>
                    </div>
                )}
                <button onClick={fetchReplies}>{showReplies ? 'Hide Replies' : 'View Replies'}</button>
                {showReplies && renderReplies(replies)}
            </div>
            <Footer />
        </>
    );
}

export default QuestionPage;
