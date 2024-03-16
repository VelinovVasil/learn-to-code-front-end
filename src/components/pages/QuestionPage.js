import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth0 } from "@auth0/auth0-react";

const QuestionPage = () => {

    // TODO: clear localstorage

    const baseUrl = `http://localhost:8080/api/`;

    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const { getAccessTokenSilently} = useAuth0();

    const question = JSON.parse(localStorage.getItem('question'));
    const tags = JSON.parse(localStorage.getItem('tags'));
    const authorName = localStorage.getItem('authorName');


    console.log('Question:');
    console.log(question);
    console.log('Tags:');
    console.log(tags);

    // useEffect(() => {
    //     localStorage.removeItem('question');
    //     localStorage.removeItem('tags');
    //     localStorage.removeItem('authorName');
    // }, []);

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

            // Fetch the author's name for each reply
            data = await Promise.all(data.map(async reply => {
                const authorResponse = await fetch(baseUrl + `users/${reply.authorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const author = await authorResponse.json();
                return { ...reply, authorName: author.name };
            }));

            console.log('Replies:');
            console.log(data);

            setReplies(data);
            setShowReplies(!showReplies);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReply = async () => {
        setShowReplyForm(true);
    };

    const handleEdit = () => {
        // Implement your edit functionality here
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

            console.log('Reply successful:', data);

            setReplyText('');
            setShowReplyForm(false);
            fetchReplies();

        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (!question || !tags) {
        // Handle the case where question or tags are not passed
        return (
            <>
                <Navbar/>
                <div className="error-message">
                    Error: Question or tags not found.
                </div>
                <Footer/>
            </>
        );
    }

    // Proceed with rendering if question and tags are available
    const tagNames = question.tagIds.map(tagId => tags[tagId].name);

    return (
        <>
            <Navbar/>
            <div className="question-details">
                <div dangerouslySetInnerHTML={{__html: question.text}}/>
                <p>Author: {authorName}</p>
                <p>Date Published: {question.datePublished}</p>
                <p>Tags: {tagNames.join(', ')}</p>
                <button onClick={handleReply}>Reply</button>
                {showReplyForm && (
                    <div>
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} />
                        <button onClick={handleSubmitReply}>Submit Reply</button>
                    </div>
                )}
                {/*Only available if the logged-in user is the author of the question*/}
                {localStorage.getItem('userId') == question.authorId && <button onClick={handleEdit}>Edit</button>}
                <button onClick={fetchReplies}>{showReplies ? 'Hide Replies' : 'View Replies'}</button>
                {showReplies && replies.map(reply => (
                    <div key={reply.id}>
                        <p>{reply.text}</p>
                        <p>Author: {reply.authorName}</p>
                        <p>Date Published: {reply.dateOfCreation}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    );
}

export default QuestionPage;
