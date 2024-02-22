import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import '../styles/ForumPage.css';

const ForumPage = () => {
    const [questions, setQuestions] = useState([]);
    const [sortBy, setSortBy] = useState('datePublished');

    const url = `insert_url_here?sortBy=${sortBy}`; // Replace 'insert_url_here' with your actual API endpoint

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchQuestions();
    }, [url]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <header id={'forumHeader'}>
                <h2 id="forumTitle">Forum</h2>
                <section id="forumFilter">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="datePublished">Date Published</option>
                        <option value="author">Author</option>
                    </select>
                    {/*Todo: add filter section*/}
                    <button id="btnAddQuestion">Add question</button>
                </section>
            </header>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <h3>{question.text}</h3>
                        <p>Author: {question.author.name}</p>
                        <p>Date Published: {question.datePublished}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ForumPage;
