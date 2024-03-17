import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import '../styles/AboutUsPage.css';

const AboutUs = () => {
    return (
        <div>
            <Navbar/>
            <h1>Our team:</h1>
            <h4>Daniel Yordanov - Back-End</h4>
            <h4>Nikolay Boychev - Back-End & Deployment</h4>
            <h4>Vasil Velinov - Back-End & Front-End</h4>

            <div className="container">
                <h1>About Us: Learn to code</h1>
                <h5>Welcome to Learn to code, your ultimate guide to becoming a successful programmer! At Learn to code,
                    we understand the journey aspiring programmers undertake to achieve their goals in the dynamic world
                    of technology. Our platform is dedicated to providing comprehensive roadmaps, resources, and
                    guidance tailored to empower individuals on their path to programming excellence.</h5>
            </div>

            <div className="container">
                <h1>Our Mission:</h1>
                <h5>At Learn to code, our mission is simple yet profound: to equip aspiring programmers with the
                    knowledge, tools, and support they need to thrive in the ever-evolving landscape of software
                    development. We believe that with the right roadmap and resources, anyone can unlock their full
                    potential and embark on a rewarding career in programming.</h5>
            </div>

            <div className="container">
                <h1>What We Offer:</h1>
                <ul>
                    <li>Comprehensive Roadmaps</li>
                    <li>Curated Resources</li>
                    <li>Community Support</li>
                    <li>Expert Advice</li>
                </ul>
            </div>

            <div className="container">
                <h1>Our Commitment to Excellence:</h1>
                <h5>At Learn to code, we are committed to excellence in everything we do. We continually update and
                    refine our roadmaps and resources to ensure they reflect the latest trends, technologies, and best
                    practices in the programming industry. Your success is our success, and we will stop at nothing to
                    help you reach your full potential as a programmer.</h5>
            </div>

            <Footer/>
        </div>
    );
}

export default AboutUs;