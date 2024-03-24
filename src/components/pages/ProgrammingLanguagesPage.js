import React from 'react';
import Navbar from "../Navbar";
import '../styles/ProgrammingLanguagesPage.css'
import {Link} from "react-router-dom";
import Footer from "../Footer";

const ProgrammingLanguagesPage = () => {
    return (
        <div>
            <div className={'languagesContainer'}>
                <Link to={"/programming-languages/java-script"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/Unofficial_JavaScript_logo_2.png'} alt={'jsLogo'}/>
                        </div>
                        <h3>JavaScript</h3>
                    </section>
                </Link>
                <Link to={"/programming-languages/java"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/Java-Emblem.jpg'} alt={'javaLogo'}/>
                        </div>
                        <h3>Java</h3>
                    </section>
                </Link>
                <Link to={"/programming-languages/python"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/pythonlogo.jpg'} alt={'pythonLogo'}/>
                        </div>
                        <h3>Python</h3>
                    </section>
                </Link>
                <Link to={"/programming-languages/sql"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/databaseImg.png'} alt={'sqlLogo'}/>
                        </div>
                        <h3>SQL</h3>
                    </section>
                </Link>
            </div>
        </div>
    );
}

export default ProgrammingLanguagesPage;
