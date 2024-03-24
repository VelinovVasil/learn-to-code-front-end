import React from 'react';
import { Link } from "react-router-dom";
import '../styles/HomePage.css';
import Navbar from "../Navbar";
import Footer from "../Footer";

const HomePage = () => {
    return (
        <div>
            <header>
                <section className={'headerText'}>
                    <h2>Coding made simple.</h2>
                    <p>Structured study plan. Roadmaps. Countless resources.</p>
                    <p>AI and community support.</p>
                </section>
            </header>
            <main className={'homePageMain'}>
                <div className="homeMainContainer">
                    <div>
                        <div className={'svgIconContainer'}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path fill="#3fabaf"
                                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </div>
                        <p>Find the best answer to your technical question, help others answer theirs.</p>
                        <Link to={'/ask-question'}>
                            <button className='homePageBtn'>Ask a question</button>
                        </Link>
                    </div>
                    <div>
                        <div className={'svgIconContainer'}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 640 512">
                                <path fill="#3fabaf"
                                      d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
                            </svg>
                        </div>
                        <p>Want to learn a new programming language or expand your current skills?</p>
                        <Link to={'/programming-languages'}>
                            <button className='homePageBtn'>Discover</button>
                        </Link>
                    </div>
                    <div>
                        <div className={'svgIconContainer'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#3fabaf" d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/></svg>
                        </div>
                        <p>You like our work? - buy us a coffee :)</p>
                        <Link to={'/donate'}>
                            <button className='homePageBtn'>Support us</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;
