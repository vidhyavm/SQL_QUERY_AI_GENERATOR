import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/login');
    };

    return (
        <div className="home-page">
            <Header />
            <main className="main-content">
                <img src="/background.png" alt="SQL Query Generator" className="background" />
                <h2 className="welcome-text">Welcome to SQL Query Generator</h2>
                <button onClick={handleStart} className="start-button">Start</button>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
