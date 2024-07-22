import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page
    };

    const handleHomeClick = () => {
        navigate('/'); // This will navigate to the homepage
    };

    const handleLoginClick = () => {
        navigate('/login'); // This will navigate to the login page
    };

    const handleSignupClick = () => {
        navigate('/signup'); // This will navigate to the signup page
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="app-name" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                   <img src='/logo2.png' alt="SQL Genie Logo" className="app-logo" /> SQLGENIE
                </h1>
                <div className="dashboard">
                    <div className="buttons">
                        <button onClick={handleBack} className="button">Back</button>
                        <button onClick={handleLoginClick} className="button">Login</button>
                        <button onClick={handleSignupClick} className="button">Signup</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
