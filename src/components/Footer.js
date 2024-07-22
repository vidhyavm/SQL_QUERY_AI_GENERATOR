import React from 'react';
import './Footer.css';

const Footer = () => {

    const currentYear=new Date().getFullYear();
    return (
        <footer className="footer">
            <p className='footer-text'>
                @{currentYear} SQLGenie,All right reserved.
            </p>
        </footer>
    );
};

export default Footer;
