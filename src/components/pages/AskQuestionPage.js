import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const AskQuestionPage = () => {

    const askQuestion = async (questionText) => {
        try {
            const response = await fetch('your-backend-url/questions', {
                method: 'POST',
                headers: {
                    // Include the JWT token from localStorage
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: questionText }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit question');
            }

        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            ask a question page
            <Footer/>
        </div>
    );
}

export default AskQuestionPage;
