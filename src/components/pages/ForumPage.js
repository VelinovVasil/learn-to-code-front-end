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
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

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
        const { value, checked } = event.target;

        if (checked) {
            setSelectedTags(prevSelectedTags => [...prevSelectedTags, value]);
        } else {
            setSelectedTags(prevSelectedTags => prevSelectedTags.filter(tag => tag !== value));
        }
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
                            {Object.values(allTags).map((tag) => (
                                <div key={tag.id}>
                                    <input
                                        type="radio"
                                        id={tag.id}
                                        name="selectedTag"
                                        value={tag.name}
                                        onChange={handleTagChange}
                                        checked={selectedTags.includes(tag.name)}
                                    />
                                    <label htmlFor={tag.id}>{tag.name}</label>
                                </div>

                            ))}
                            <button type="submit">Filter</button>
                        </form>

                    </div>
                </section>
            </header>
            <ul>
                {questions.map((question) => (
                    <Question
                        key={question.id}
                        question={question}
                        authors={authors}
                        tags={tags}
                    />
                ))}
            </ul>
            <Footer/>
        </div>
    );
    ;
}

export default ForumPage;
