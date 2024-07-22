import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './GenerateSQL.css';
import Querygen from './Querygen'; // Import Querygen component
import Aboutus from './Aboutus'; // Import AboutUs component
import Profile from './Profile'; // Import Profile component

const GenerateSQL = () => {
    const [activeComponent, setActiveComponent] = useState(''); // State to track the active component
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('username');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    const handleGenieClick = (data) => {
        console.log(data); // Log the generated SQL query for debugging
    };

    const handleTaskbarClick = (component) => {
        setActiveComponent(component); // Set the active component based on the clicked taskbar item
    };

    return (
        <div className="generate-sql-page">
            <Header />
            <div className="content-wrapper">
                <div className="taskbar">
                    <div className="taskbar-item" onClick={() => handleTaskbarClick('genie')}>
                        Genie
                    </div>
                    <div className="taskbar-item" onClick={() => handleTaskbarClick('aboutus')}>
                        About Us
                    </div>
                    <div className="taskbar-item" onClick={() => handleTaskbarClick('profile')}>
                        Profile
                    </div>
                </div>
                <div className="generate-sql">
                    {activeComponent === 'genie' && (
                        <Querygen onGenerate={handleGenieClick} />
                    )}
                    {activeComponent === 'aboutus' && <Aboutus />} {/* Render AboutUs component */}
                    {activeComponent === 'profile' && <Profile />} {/* Render Profile component */}
                </div>
            </div>
        </div>
    );
};

export default GenerateSQL;
