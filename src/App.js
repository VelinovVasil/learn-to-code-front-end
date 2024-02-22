import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
