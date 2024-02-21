import React from 'react';
import { Link } from "react-router-dom";
import './styles/HomePage.css';

const HomePage = () => {
    return (
        <div>
            <header>
                <div className={'upperHeader'}>
                    <h4 className={'navText'}>Learn to code</h4>
                    <nav>
                        <ul className={'navUl'}>
                            <li>
                                <Link to={'/programming-languages'} className={'navLink'}>
                                    <h4>Programming languages</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/forum'} className={'navLink'}>
                                    <h4>Forum</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/about-us'} className={'navLink'}>
                                    <h4>About us</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/contact'} className={'navLink'}>
                                    <h4>Contacts</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/sign-in'} className={'navLink'}>
                                    <h4>Sign in</h4>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
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
