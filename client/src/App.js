// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GenerateSQL from './components/GenerateSQL';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Aboutus from './components/Aboutus';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate-sql" element={
                    <PrivateRoute>
                        <GenerateSQL />
                    </PrivateRoute>
                } />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
