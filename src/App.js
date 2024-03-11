
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import HomePage from './components/pages/HomePage';
import ProgrammingLanguagesPage from './components/pages/ProgrammingLanguagesPage';
import ForumPage from './components/pages/ForumPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import JavaScriptPage from "./components/pages/JavaScriptPage";
import JavaPage from "./components/pages/JavaPage";
import PythonPage from "./components/pages/PythonPage";
import SQLPage from "./components/pages/SQLPage";
import './App.css';
import AskQuestionPage from "./components/pages/AskQuestionPage";
import UserPage from "./components/pages/UserPage";
import CallbackPage from "./components/pages/CallbackPage";

function App() {
    return (
        <Router>
            {/* Wrap your Routes with Auth0Provider */}
            {/* HARD coded the values below due to missing env files  */}
            <Auth0Provider
                domain="nvd.eu.auth0.com"
                clientId="JzuLTdbayWt6ES7vnv0i84k63vqz6UG1"
                authorizationParams={{
                    redirect_uri: "http://localhost:4040/callback",
                    //setting the audience here because it seems to not be possible to invoke silently access to api
                    //in the other case when fetching error is generated
                    //more info here https://community.auth0.com/t/call-an-api-consent-required/53324
                    audience: "https://hello-world.example.com",
                }}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/programming-languages" element={<ProgrammingLanguagesPage />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/java-script" element={<JavaScriptPage />} />
                    <Route path="/java" element={<JavaPage />} />
                    <Route path="/python" element={<PythonPage />} />
                    <Route path="/sql" element={<SQLPage/>} />
                    <Route path="/ask-question" element={<AskQuestionPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/callback" element={<CallbackPage />} />
                </Routes>
            </Auth0Provider>
        </Router>
    );
}

export default App;


