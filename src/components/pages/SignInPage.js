import React, {useState} from 'react';
import '../styles/SignInPage.css';
import {Link} from "react-router-dom";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Navbar from "../Navbar";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the server
            const response = await fetch('your-login-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Handle successful login
                console.log('Login successful');
            } else {
                // Handle login error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className={'formContainer'}>
                <h3>Sign in</h3>
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
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <Link to={'/forgot-password'}>
                            <p>Forgot password?</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;