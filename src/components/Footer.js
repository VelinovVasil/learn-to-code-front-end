import React from 'react';
import './styles/Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <Link to={'/'} className={'linkNavText'}>
                <h4 id={'footerLogo'} className={'navText'}>&lt;Learn to code/&gt;</h4>
            </Link>

            <ul className={'footerUl'}>
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
            </ul>
        </footer>
);
}

export default Footer;