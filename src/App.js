import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import HomePage from './components/pages/HomePage';
import ProgrammingLanguagesPage from './components/pages/ProgrammingLanguagesPage';
import ForumPage from './components/pages/ForumPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import SignInPage from "./components/pages/SignInPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import JavaScriptPage from "./components/pages/JavaScriptPage";
import JavaPage from "./components/pages/JavaPage";
import PythonPage from "./components/pages/PythonPage";
import SQLPage from "./components/pages/SQLPage";
import CreateAccountPage from "./components/pages/CreateAccountPage";
import './App.css';
import AskQuestionPage from "./components/pages/AskQuestionPage";
import UserPage from "./components/pages/UserPage";
import CallbackPage from "./components/pages/CallbackPage";

function App() {
    return (
        <Router>
            {/* Wrap your Routes with Auth0Provider */}
            <Auth0Provider
                domain="nvd.eu.auth0.com"
                clientId="JzuLTdbayWt6ES7vnv0i84k63vqz6UG1"
                redirectUri={'http://localhost:4040/callback'}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/programming-languages" element={<ProgrammingLanguagesPage />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/java-script" element={<JavaScriptPage />} />
                    <Route path="/java" element={<JavaPage />} />
                    <Route path="/python" element={<PythonPage />} />
                    <Route path="/sql" element={<SQLPage/>} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                    <Route path="/ask-question" element={<AskQuestionPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/callback" element={<CallbackPage />} />
                </Routes>
            </Auth0Provider>
        </Router>
    );
}

export default App;
