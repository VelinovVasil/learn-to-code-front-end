import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAuth0 } from "@auth0/auth0-react";
import {fetchRepliesByQuestionId, replyToAReply, submitReply} from "../../services/replyService";
import {fetchAuthor} from "../../services/userService";
import ReactQuill from "react-quill";
import {get} from "axios";
import {editQuestion, markQuestionAsAnswered} from "../../services/questionService";
import {useNavigate} from "react-router-dom";
import '../styles/QuestionPage.css';

const QuestionPage = () => {
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyToAReplyText, setReplyToAReplyText] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const [replyButtonClicked, setReplyButtonClicked] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [replyToReplyButtonClicked, setReplyToReplyButtonClicked] = useState(false);
    const [replyToReplyId, setReplyToReplyId] = useState(null);
    const navigate = useNavigate();
    const [questionTitle, setQuestionTitle] = useState('');

    const question = JSON.parse(localStorage.getItem('question'));
    const tags = JSON.parse(localStorage.getItem('tags'));
    const authorName = localStorage.getItem('authorName')

    const [updatedQuestionText, setUpdatedQuestionText] = useState(question.text);
    const [selectedTagIds, setSelectedTagIds] = useState([]);


    const [replyBeingRepliedTo, setReplyBeingRepliedTo] = useState(null);
    const [replyToAReplyButtonClicked, setReplyToAReplyButtonClicked] = useState(false);

    // Function to set the reply being replied to
    const handleReplyToAReply = (replyId) => {
        setReplyBeingRepliedTo(replyId);
        setReplyToAReplyButtonClicked(!replyToAReplyButtonClicked);
        setReplyToReplyId(replyId);
    };

    // Function to clear the reply being replied to
    const handleDiscardReplyToAReply = () => {
        setReplyBeingRepliedTo(null)
        setReplyToAReplyButtonClicked(false);
        setReplyToReplyId(null);
    };

    // Function to check if a reply is being replied to
    const isReplyBeingRepliedTo = (replyId) => {
        return replyBeingRepliedTo === replyId;
    };


    const fetchReplies = async () => {
        try {
            const token = await getAccessTokenSilently();

            let data = await fetchRepliesByQuestionId(token, question.id);

            data = await Promise.all(data.map(async reply => {

                const author = await fetchAuthor(token, reply.authorId);

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

            const author = await fetchAuthor(token, reply.authorId);

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

    const handleEdit = () => {
        setEditButtonClicked(!editButtonClicked);
    };

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();

            await submitReply(token, localStorage.getItem('userId'), replyText, question.id);

            setReplyButtonClicked(false);
            setReplyText('');
            setShowReplyForm(false);
            await fetchReplies();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmitReplyToAReply = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();

            await replyToAReply(token, replyToReplyId, localStorage.getItem('userId'), replyToAReplyText, question.id);

            setReplyToAReplyText('');
            setReplyToReplyId(null);
            await fetchReplies();
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

    const renderReplies = (replies, level = 0) => {
        return replies.map(reply => (
            <div key={reply.id} style={{ marginLeft: level * 20 }}>
                <p>{reply.text}</p>
                <p>Author: {reply.authorName}</p>
                <p>Date Published: {new Date(reply.dateOfCreation).toLocaleString()}</p>
                <button onClick={() => handleReplyToAReply(reply.id)}>{replyToReplyButtonClicked ? 'Discard Reply to Reply' : 'Reply to Reply'}</button>
                {/*{replyToReplyButtonClicked && <button onClick={handleDiscardReplyToAReply}>Discard Reply to Reply</button>}*/}
                {reply.id == replyToReplyId && (
                    <div>
                        <textarea value={replyToAReplyText} onChange={e => setReplyToAReplyText(e.target.value)} />
                        <button onClick={handleSubmitReplyToAReply}>Submit Reply</button>
                    </div>
                )}
                {reply.childReplies.length > 0 && renderReplies(reply.childReplies, level + 1)}
            </div>
        ));
    };

    const handleMarkAsAnswered = async () => {
        try {

            const token = await getAccessTokenSilently();
            await markQuestionAsAnswered(token, question.id);
            navigate("/forum");

        } catch (error) {
            console.log(error);
        }
    }

    const renderEditForm = (question, tags) => {

        return (
            <>
                <input
                    type="text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    // Placeholder for title input
                />
                <ReactQuill
                    id={'editQuestionArea'}
                    value={updatedQuestionText}
                    onChange={setUpdatedQuestionText}
                    placeholder="Type your question here"
                />
                <h4>Tags:</h4>
                {Object.values(tags).map((tag) => (
                    <button
                        key={tag.id}
                        id={tag.id}
                        className={selectedTagIds.includes(tag.id) ? 'selected' : ''}
                        onClick={() => handleTagClick(tag.id)}
                    >
                        {tag.name}
                    </button>
                ))}
                <button id={'btnSaveEdit'} onClick={handleSaveEdit}>
                    Save edit
                </button>
            </>
        );
    }

    const handleSaveEdit = async () => {

        if (selectedTagIds.length === 0) {
            window.alert('Please select tags for the question.');
            return;
        }

        try {

            const token = await getAccessTokenSilently();

            const objToSave = {
                id: question.id,
                title: questionTitle,
                text: updatedQuestionText,
                authorId: localStorage.getItem("userId"),
                tagIds: selectedTagIds,
                imageUrls: []
            };

            await editQuestion(token, objToSave);
            navigate("/forum");

        } catch (error) {
            console.log(error);
        }
    }

    const handleTagClick = (tagId) => {
        // Toggle the selection of the tag
        setSelectedTagIds((prevSelectedTagIds) =>
            prevSelectedTagIds.includes(tagId)
                ? prevSelectedTagIds.filter((id) => id !== tagId)
                : [...prevSelectedTagIds, tagId]
        );
    };

    return (
        <>
            <Navbar />
            <div className="question-details">
                <h2>Title: {question.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: question.text }} />
                <p>Author: {authorName}</p>
                <p>Date Published: {new Date(question.datePublished).toLocaleString()}</p>
                <p>Tags: {question.tagIds.map(tagId => tags[tagId].name).join(', ')}</p>
                { editButtonClicked && (
                    renderEditForm(question, tags)
                )}
                {!replyButtonClicked && localStorage.getItem('userId') == question.authorId &&
                    <button onClick={handleEdit}>{editButtonClicked ? 'Discard Edit' : 'Edit Question'}</button>
                }
                {localStorage.getItem('userId') == question.authorId &&
                    <button onClick={handleMarkAsAnswered}>Delete question</button>
                }
                {!editButtonClicked &&
                    <button onClick={handleReply}>{replyButtonClicked ? 'Discard Reply' : 'Reply to Question'}</button>
                }
                {showReplyForm && (
                    <div>
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} />
                        <button onClick={handleSubmitReply}>Submit Reply</button>
                    </div>
                )}
                {!showReplies && <button onClick={fetchReplies}>{'View Replies'}</button>}
                {showReplies && renderReplies(replies)}
            </div>
            <Footer />
        </>
    );
}

export default QuestionPage;
