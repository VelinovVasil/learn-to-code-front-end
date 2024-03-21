import React from 'react';
import {useNavigate} from "react-router-dom";

const Question = ({question, authors, tags}) => {
    const navigate = useNavigate();

    const navigateToQuestion = (question, tags) => {
        localStorage.setItem('question', JSON.stringify(question));
        localStorage.setItem('tags', JSON.stringify(tags));
        localStorage.setItem('authorName', authors[question.authorId].nickname);
        navigate(`/question/${question.id}`);
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
            <li key={question && question.id} className={'questionLi'}>
                {question && question.id ? (
                    <div onClick={() => navigateToQuestion(question, tags)} className={'questionContainer'}>
                        <p>Title: {question.title}</p>
                        {authors[question.authorId] && (
                            <p className={'authorName'}>Author: {authors[question.authorId].nickname}</p>
                        )}
                        <p>Tags: {question.tagIds && question.tagIds.map(tagId => (
                            tags[tagId] ? tags[tagId].name : ''
                        )).join(', ')}</p>
                        <p>Date Published: {question.datePublished && formatDate(question.datePublished)}</p>
                    </div>
                ) : null}
            </li>
            );
}

export default Question;