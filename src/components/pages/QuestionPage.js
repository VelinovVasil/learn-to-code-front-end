import React, {useEffect} from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";

const QuestionPage = () => {

    const question = JSON.parse(localStorage.getItem('question'));
    const tags = JSON.parse(localStorage.getItem('tags'));
    const authorName = localStorage.getItem('authorName');

    console.log('Question:');
    console.log(question);
    console.log('Tags:');
    console.log(tags);

    useEffect(() => {
        localStorage.removeItem('question');
        localStorage.removeItem('tags');
        localStorage.removeItem('authorName');
    }, []);

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
                {/* Render other properties of the question object */}
            </div>
            <Footer/>
        </>
    );
}

export default QuestionPage;
