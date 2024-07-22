import React, { useState } from 'react';
import './Querygen.css';

const Querygen = ({ onGenerate }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (query.trim() === '') return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:8080/generate_sql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: query }),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.sql_query) {
                    setResponse(data.sql_query);
                    onGenerate(data.sql_query); // Call onGenerate prop with the generated SQL query
                } else {
                    setResponse('Error: Could not generate SQL query.');
                }
            } else {
                handleErrorResponse(data);
            }
        } catch (error) {
            setResponse('Error: Unable to fetch response');
            setError('Unable to connect to the server. Please try again later.');
        }

        setLoading(false);
    };

    const handleErrorResponse = (data) => {
        if (data.error) {
            setResponse('Error: ' + data.error);
            setError('The input could not be processed. Please check your query and try again.');
        } else {
            setResponse('Error: Unknown error occurred.');
            setError('An unknown error occurred. Please try again.');
        }
    };

    const handleKeyPress = (e) => {
        if ( e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="querygen">
            <div className="image-container">
                <img src="/background2.png" alt="Query Generator" />
            </div>
            <div className="search-box">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your query..."
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {loading && <div className="loading">Loading...</div>}
            {!loading && response && (
                <div className="response-container">
                    <h2>Generated SQL Query:</h2>
                    <p>{response}</p>
                </div>
            )}
            {!loading && error && (
                <div className="error-container">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Querygen;
