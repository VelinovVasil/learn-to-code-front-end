import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

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
                // Retrieve JWT token from response
                const { token } = await response.json();

                // Store the token in localStorage
                localStorage.setItem('token', token);

                // Redirect or perform any other action upon successful login
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
            <Navbar />
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
                    <div id={'forgotPassNewAccContainer'}>
                        <Link to={'/forgot-password'}>
                            <p>Forgot password?</p>
                        </Link>
                        <Link to={'/create-account'}>
                            <p>Sign up</p>
                        </Link>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SignInPage;
