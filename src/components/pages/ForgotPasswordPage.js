import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Navbar from "../Navbar";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the server
            const response = await fetch('your-reset-pass-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // Handle successful login
                console.log('Email found');
            } else {
                // Handle login error
                console.error('Email not present');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className={'formContainer'}>
                <h3>Reset password</h3>
                <form onSubmit={handleSubmit} className={'signInForm'}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Reset password</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;