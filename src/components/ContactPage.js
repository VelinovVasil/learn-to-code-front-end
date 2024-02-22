import React from 'react';
import Navbar from "./Navbar";
import './styles/ContactPage.css'

const ContactPage = () => {
    return (
      <div>
          <Navbar/>
          <header id={'contactHeader'}>
              <h2>Contact us</h2>
              <p>If you have any enquiries, leave an email.</p>
          </header>
              <h4>velinov.vasil.i@gmail.com - Vasil Velinov (back-end and front-end)</h4>
      </div>
    );
}

export default ContactPage;