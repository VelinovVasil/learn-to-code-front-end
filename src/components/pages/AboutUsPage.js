import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import '../styles/AboutUsPage.css';

const AboutUs = () => {
    return (
        <div>

            <div className="container">
                <h1>Our team:</h1>
                <ul id="ourTeamUl">
                    <li>
                        <p>Daniel Yordanov - Back-End, Resources & Design</p>
                    </li>
                    <li>
                        <p>Nikolay Boychev - Back-End & Deployment</p>
                    </li>
                    <li>
                        <p>Vasil Velinov - Front-End, Back-End & Design</p>
                    </li>
                </ul>
            </div>


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
                <h1>Our Commitment to Excellence:</h1>
                <h5>At Learn to code, we are committed to excellence in everything we do. We continually update and
                    refine our roadmaps and resources to ensure they reflect the latest trends, technologies, and best
                    practices in the programming industry. Your success is our success, and we will stop at nothing to
                    help you reach your full potential as a programmer.</h5>
            </div>

        </div>
    );
}

export default AboutUs;