import React, { useState } from 'react';
import '../styles/DonationPage.css';
import {donate} from '../../services/donationService';

const DonationPage = () => {
    const [value, setValue] = useState(0);

    const handleDonation = async () => {
        const response = await donate(value);
        const data = await response.json();

        window.location.href = data.url;
    }

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
        <h3 id='donationHeading'>Want to support our project? - buy us a coffee :)</h3>
            <div id='donationsContainer'>
                <h3 className="title">Donation Information</h3>
                <div className="amount">
                    <button className="btnMoneyValue" onClick={() => setValue(10)}>10 BGN</button>
                    <button className="btnMoneyValue" onClick={() => setValue(30)}>30 BGN</button>
                    <button className="btnMoneyValue" onClick={() => setValue(50)}>50 BGN</button>
                    <div className="btnMoneyValue">
                        <input 
                            type="number" 
                            className="set-amount" 
                            placeholder="Enter custom amount" 
                            value={value} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <button id='donateBtn' onClick={handleDonation}>Donate now</button>
            </div>
        </>
    );
}

export default DonationPage;
