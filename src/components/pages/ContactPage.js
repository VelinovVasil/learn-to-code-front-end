import React, { useState } from 'react';
import Navbar from "../Navbar";
import '../styles/ContactPage.css'
import Footer from "../Footer";

const ContactPage = () => {
    // State variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission logic here
        // For now, let's just log the form data
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
        // Clear form fields after submission
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div>
            <Navbar />
            <header id={'contactHeader'}>
                <h2>Contact us</h2>
                <p>If you have any enquiries, leave an email.</p>
            </header>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label className="label" htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="inputText"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="inputEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        className="textArea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submitButton">Submit</button>
            </form>

            <Footer/>
        </div>
    );
}

export default ContactPage;
