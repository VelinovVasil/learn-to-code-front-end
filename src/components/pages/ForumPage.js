// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar';
// import '../styles/ForumPage.css';
// import Footer from "../Footer";
// import { Link } from "react-router-dom";
//
// const ForumPage = () => {
//     const [questions, setQuestions] = useState([]);
//     const [sortBy, setSortBy] = useState('datePublished');
//
//     // Define the URL for fetching questions
//     const url = `insert_url_here?sortBy=${sortBy}`; // Replace 'insert_url_here' with your actual API endpoint
//
//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await fetch(url, {
//                     // Add headers for authentication if needed
//                     headers: {
//                         // Include the JWT token from localStorage
//                         Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch questions');
//                 }
//                 const data = await response.json();
//                 setQuestions(data);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         fetchQuestions();
//     }, [url]);
//
//     const handleSortChange = (e) => {
//         setSortBy(e.target.value);
//     };
//
//     const askQuestion = async (questionText) => {
//         try {
//             const response = await fetch('your-backend-url/questions', {
//                 method: 'POST',
//                 headers: {
//                     // Include the JWT token from localStorage
//                     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ text: questionText }),
//             });
//
//             if (!response.ok) {
//                 throw new Error('Failed to submit question');
//             }
//
//             // Refresh questions after successful submission
//             fetchQuestions();
//         } catch (error) {
//             console.error('Error submitting question:', error);
//         }
//     };
//
//     const replyToQuestion = async (questionId, replyText) => {
//         try {
//             const response = await fetch(`your-backend-url/questions/${questionId}/replies`, {
//                 method: 'POST',
//                 headers: {
//                     // Include the JWT token from localStorage
//                     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ text: replyText }),
//             });
//
//             if (!response.ok) {
//                 throw new Error('Failed to submit reply');
//             }
//
//             // Refresh questions after successful submission
//             fetchQuestions();
//         } catch (error) {
//             console.error('Error submitting reply:', error);
//         }
//     };
//
//     return (
//         <div>
//             <Navbar />
//             <header id={'forumHeader'}>
//                 <section className={'headerAskBtn'}>
//                     <h2 id="forumTitle">Forum</h2>
//                     <Link to={'/ask-question'}>
//                         <button id={'btnAddQuestion'}>Ask a question</button>
//                     </Link>
//                 </section>
//                 <section id="forumFilter">
//                     <label>Sort by:</label>
//                     <select value={sortBy} onChange={handleSortChange}>
//                         <option value="datePublished">Date Published</option>
//                         <option value="author">Author</option>
//                     </select>
//                     {/*Todo: add filter section*/}
//                 </section>
//             </header>
//             <ul>
//                 {questions.map((question) => (
//                     <li key={question.id}>
//                         <h3>{question.text}</h3>
//                         <p>Author: {question.author.name}</p>
//                         <p>Date Published: {question.datePublished}</p>
//                         <p>Tags: {question.tags.join(', ')}</p>
//                         <button onClick={() => replyToQuestion(question.id, 'Your reply text here')}>
//                             Reply
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             <Footer />
//         </div>
//     );
// }
//
// export default ForumPage;

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import '../styles/ForumPage.css';
import Footer from "../Footer";
import { Link } from "react-router-dom";

const ForumPage = () => {
    const [questions, setQuestions] = useState([]);
    const [sortBy, setSortBy] = useState('datePublished');

    // Define the URL for fetching questions
    const url = `insert_url_here?sortBy=${sortBy}`; // Replace 'insert_url_here' with your actual API endpoint

    const fetchQuestions = async () => {
        try {
            const response = await fetch(url, {
                // Add headers for authentication if needed
                headers: {
                    // Include the JWT token from localStorage
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions, url]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // const askQuestion = async (questionText) => {
    //             try {
    //         const response = await fetch('your-backend-url/questions', {
    //             method: 'POST',
    //             headers: {
    //                 // Include the JWT token from localStorage
    //                 Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ text: questionText }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Failed to submit question');
    //         }
    //
    //         // Refresh questions after successful submission
    //         fetchQuestions();
    //     } catch (error) {
    //         console.error('Error submitting question:', error);
    //     }
    // };

    const replyToQuestion = async (questionId, replyText) => {
                try {
            const response = await fetch(`your-backend-url/questions/${questionId}/replies`, {
                method: 'POST',
                headers: {
                    // Include the JWT token from localStorage
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: replyText }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit reply');
            }

            // Refresh questions after successful submission
            fetchQuestions();
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
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
                <section id="forumFilter">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="datePublished">Date Published</option>
                        <option value="author">Author</option>
                    </select>
                    {/*Todo: add filter section*/}
                </section>
            </header>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <h3>{question.text}</h3>
                        <p>Author: {question.author.name}</p>
                        <p>Date Published: {question.datePublished}</p>
                        <p>Tags: {question.tags.join(', ')}</p>
                        <button onClick={() => replyToQuestion(question.id, 'Your reply text here')}>
                            Reply
                        </button>
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default ForumPage;

