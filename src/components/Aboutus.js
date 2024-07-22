import React from 'react';
import './Aboutus.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <img src="/sqlbackground.png" alt="SQL Query Generator" className="sqlbackground" />
            <h2>About Us</h2>
            <p>Welcome to SQL Query Generator! Our mission is to help users generate SQL queries easily and efficiently using advanced AI technologies.</p>
            <p>Our team consists of experienced developers and data scientists who are passionate about making data management and query generation accessible to everyone.</p>
            <p>We believe in the power of technology to simplify complex tasks and are committed to providing the best tools and support for our users.</p>
            <p>Thank you for choosing SQL Query Generator. We hope our tool helps you achieve your goals and enhances your productivity.</p>
        </div>
    );
};

export default AboutUs;
