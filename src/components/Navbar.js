import React from 'react';
import {Link} from "react-router-dom";
import LoginButton from "./LoginButton";
import './styles/Navbar.css';

const Navbar = () => {

    return (
        <div className={'upperHeader'}>
            <Link to={'/'} className={'linkNavText'}>
                <h4 className={'navText'}>&lt;Learn to code/&gt;</h4>
            </Link>
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
                        <Link to={'/chat'} className={'navLink'}>
                            <h4>Chat</h4>
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
                    <li id={'liBtnLogin'}>
                            <LoginButton />
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;