import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async (username) => {
            try {
                const response = await fetch(`http://localhost:8080/user/${username}`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to fetch user data');
                }
            } catch (error) {
                setError('Error: Unable to fetch user data');
            }
        };

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            fetchUserData(storedUsername);
        } else {
            setError('No user logged in');
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                alert('Logged out successfully');
                localStorage.removeItem('username');
                window.location.href = '/'; // Navigate to homepage
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to logout');
            }
        } catch (error) {
            setError('Error: Unable to logout');
        }
    };

    return (
        <div className="profile-card">
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>{error}</p>
            )}
            <button onClick={handleLogout} className="logout-button">Logout</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Profile;
