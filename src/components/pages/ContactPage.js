import React from 'react';
import Navbar from "../Navbar";
import '../styles/ContactPage.css'
import Footer from "../Footer";

const ContactPage = () => {
    return (
      <div>
          <Navbar/>
          <header id={'contactHeader'}>
              <h2>Contact us</h2>
              <p>If you have any enquiries, leave an email.</p>
          </header>
              <h4>velinov.vasil.i@gmail.com - Vasil Velinov (lead front-end)</h4>
              <h4>danielnikolaevyordanov@gmail.com - Daniel Yordanov (back-end /  front-end)</h4>
              <h4>bondableglobe10@gmail.com - Nikolay Boychev (lead back-end / dev ops)</h4>
          <Footer/>
      </div>
    );
}

export default ContactPage;