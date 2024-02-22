import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProgrammingLanguagesPage from './components/ProgrammingLanguagesPage';
import ForumPage from './components/ForumPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import SignInPage from "./components/SignInPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import JavaScriptPage from "./components/JavaScriptPage";
import JavaPage from "./components/JavaPage";
import PythonPage from "./components/PythonPage";
import SQLPage from "./components/SQLPage";

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
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/java-script" element={<JavaScriptPage />} />
                <Route path="/java" element={<JavaPage />} />
                <Route path="/python" element={<PythonPage />} />
                <Route path="/sql" element={<SQLPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
