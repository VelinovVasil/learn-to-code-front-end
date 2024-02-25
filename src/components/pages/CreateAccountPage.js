import React, { useState } from 'react';
import '../styles/SignInPage.css';
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send create account request to the server
            const response = await fetch('your-create-account-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Handle successful account creation
                console.log('Account created successfully');
            } else {
                // Handle account creation error
                console.error('Account creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className={'formContainer'}>
                <h3>Create Account</h3>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Create Account</button>
                    </div>
                    <div id={'forgotPassNewAccContainer'}>
                        <Link to={'/forgot-password'}>
                            <p>Forgot password?</p>
                        </Link>
                        <Link to={'/sign-in'}>
                            <p>Sign in</p>
                        </Link>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default CreateAccountPage;
