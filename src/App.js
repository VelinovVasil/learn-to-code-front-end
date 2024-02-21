import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProgrammingLanguagesPage from './components/ProgrammingLanguagesPage';
import ForumPage from './components/ForumPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import SignInPage from "./components/SignInPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/programming-languages" element={<ProgrammingLanguagesPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
            </Routes>
        </Router>
    );
}

export default App;
