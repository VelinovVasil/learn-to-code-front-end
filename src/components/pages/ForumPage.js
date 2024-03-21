import React, {useState, useEffect, useCallback} from 'react';
import Navbar from '../Navbar';
import '../styles/ForumPage.css';
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import 'react-quill/dist/quill.snow.css';
import {getQuestions} from "../../services/questionService";
import {getOneUser} from "../../services/userService";
import {fetchTags, getOneTag} from "../../services/tagService"; // Import Quill's snow theme CSS
import Question  from "../Question";

const ForumPage = () => {
    const [questions, setQuestions] = useState([]);
    const [authors, setAuthors] = useState({});
    const [tags, setTags] = useState({});
    const [allTags, setAllTags] = useState({});
    const [selectedTags, setSelectedTags] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const navigate = useNavigate();

    useEffect(() => {

        const fetchTagsData = async () => {
            const token = await getAccessTokenSilently();
            const fetchedTags = await fetchTags(token);
            setAllTags(fetchedTags);
        }

        setIsLoading(true);

        try {
            fetchTagsData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleTagChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedTags(selectedOptions);
    };


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
    },[authors,getAccessTokenSilently,tags]);

    useEffect(() => {
        setIsLoading(true);

        try {
            fetchQuestions()
                .then(data => console.log(data));

        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchQuestions]);

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const handleFilter = (e) => {
        e.preventDefault();

        // TODO:
        // setQuestions(await fetchQuestionsByTagNames)
    }


    return (
        <div>
            <Navbar />
            <header id={'forumHeader'}>
                <section className={'headerAskBtn'}>
                    <h2 id="forumTitle">Forum</h2>
                    {isLoading && <div className="loading">Loading&#8230;</div>}
                    <div id={'askFilterContainer'}>
                        <Link to={'/ask-question'}>
                            <button id={'btnAddQuestion'}>Ask a question</button>
                        </Link>

                        <form onSubmit={(e) => handleFilter(e)}>
                            <select multiple onChange={handleTagChange}>
                                {Object.values(allTags).map((tag) => (
                                    <option key={tag.id}>{tag.name}</option>
                                ))}
                            </select>
                            <button type="submit">Filter</button>
                        </form>
                    </div>
                </section>
            </header>
            <ul>
                {/* Export question block to seperate component*/}
                {questions.map((question) => (
                    // <li key={question && question.id} className={'questionLi'}>
                    //     {question && question.id ? (
                    //         <div onClick={() => navigateToQuestion(question, tags)} className={'questionContainer'}>
                    //             <p>Title: {question.title}</p>
                    //                 {authors[question.authorId] && (
                    //                     <p className={'authorName'}>Author: {authors[question.authorId].nickname}</p>
                    //                 )}
                    //                 <p>Tags: {question.tagIds && question.tagIds.map(tagId => (
                    //                     tags[tagId] ? tags[tagId].name : ''
                    //                 )).join(', ')}</p>
                    //                 <p>Date Published: {question.datePublished && formatDate(question.datePublished)}</p>
                    //             </div>
                    //     ) : null}
                    // </li>
                    <Question
                        // key={question.id}
                        question={question}
                        authors={authors}
                        tags={tags}
                    />
                ))}
            </ul>
            <Footer />
        </div>
    );
;
}

export default ForumPage;
