import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";

const AboutUs = () => {
    return (
        <div>
            <Navbar/>
            <h1>Our team:</h1>
            <h4>Daniel Yordanov - Back-End</h4>
            <h4>Nikolay Boychev - Back-End & Deployment</h4>
            <h4>Vasil Velinov - Back-End & Front-End</h4>
            <Footer />
        </div>
    );
}

export default AboutUs;