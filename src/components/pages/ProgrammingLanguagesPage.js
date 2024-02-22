import React from 'react';
import Navbar from "../Navbar";
import '../styles/ProgrammingLanguagesPage.css'
import {Link} from "react-router-dom";
import JavaScriptPage from "./JavaScriptPage";

const ProgrammingLanguagesPage = () => {
    return (
        <div>
            <Navbar/>
            <div className={'languagesContainer'}>
                <Link to={"/java-script"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/Unofficial_JavaScript_logo_2.png'} alt={'jsLogo'}/>
                        </div>
                        <h3>JavaScript</h3>
                    </section>
                </Link>
                <Link to={"/java"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/Java-Emblem.jpg'} alt={'javaLogo'}/>
                        </div>
                        <h3>Java</h3>
                    </section>
                </Link>
                <Link to={"/python"}>
                    <section className={'programmingLanguageSection'}>
                        <div className={'logoIconContainer'}>
                            <img src={process.env.PUBLIC_URL + '/images/pythonlogo.jpg'} alt={'pythonLogo'}/>
                        </div>
                        <h3>Python</h3>
                    </section>
                </Link>
                <Link to={"/sql"}>
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
