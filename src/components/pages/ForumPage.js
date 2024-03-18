import React, {useState, useEffect, useCallback} from 'react';
import Navbar from '../Navbar';
import '../styles/ForumPage.css';
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css';
import {getQuestions} from "../../services/questionService";
import {getOneUser} from "../../services/userService";
import {getOneTag} from "../../services/tagsService"; // Import Quill's snow theme CSS

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
    const useEffectDependency = 'http://localhost:8080/api/questions/'

    // TODO: display edit button

    const navigate = useNavigate();

    const navigateToQuestion = (question, tags) => {
        localStorage.setItem('question', JSON.stringify(question));
        localStorage.setItem('tags', JSON.stringify(tags));
        localStorage.setItem('authorName', authors[question.authorId].nickname);
        navigate(`/question/${question.id}`);
    };

    const fetchQuestions = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();

            const data = await getQuestions(token);

            for (const question of data) {
                const authorId = question.authorId;

                // Fetch author info if not already fetched
                if (!authors[authorId]) {
                    try {
                        const authorInfo = await getOneUser(token, authorId);

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
                            const tagInfo = await getOneTag(token, tagId);

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
    },[authors,baseUrl,getAccessTokenSilently,tags]);

    useEffect(() => {
            //TODO: Extract into services and setState in useEffect
            fetchQuestions()
                .then(data => console.log(data));
    }, [fetchQuestions, useEffectDependency]);

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
            </header>
            <ul>
                {/* Export question block to seperate component*/}
                {questions.map((question) => (
                    <li key={question && question.id} className={'questionLi'}>
                        {question && question.id ? (
                            // <Link to={{
                            //     pathname: `/question/${question.id}`,
                            //     state: { question: question, tags: tags } }}>
                            <div onClick={() => navigateToQuestion(question, tags)} className={'questionContainer'}>
                                    <div dangerouslySetInnerHTML={{__html: question.text}}/>
                                    {authors[question.authorId] && (
                                        <p className={'authorName'}>Author: {authors[question.authorId].nickname}</p>
                                    )}
                                    <p>Tags: {question.tagIds && question.tagIds.map(tagId => (
                                        tags[tagId] ? tags[tagId].name : ''
                                    )).join(', ')}</p>
                                    <p>Date Published: {question.datePublished && formatDate(question.datePublished)}</p>
                                </div>
                            // </Link>
                        ) : null}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
;
}

export default ForumPage;
