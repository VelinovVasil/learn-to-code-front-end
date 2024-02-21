import React from 'react';
import { Link } from "react-router-dom";
import './styles/HomePage.css';
import Navbar from "./Navbar";

const HomePage = () => {
    return (
        <div>
            <header>
                <Navbar/>
                <section className={'headerText'}>
                    <h2>Coding made simple.</h2>
                    <p>Structured study plan. Roadmaps. Countless resources.</p>
                    <p>AI and community support.</p>
                </section>
            </header>
            <main className={'homePageMain'}>

            </main>
        </div>
    );
}

export default HomePage;
