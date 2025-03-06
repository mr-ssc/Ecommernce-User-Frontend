import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import Navbar from './Navbar';
import { DarkModeContext } from './DarkModeContext'; // Import the DarkModeContext

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { isDarkMode } = useContext(DarkModeContext); // Get the dark mode state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication (replace with API call)
        const mockUser = {
            name: 'John Doe',
            email: formData.email,
            phone: '1234567890',
            gender: 'Male',
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        navigate('/account');
    };

    return (
        <>
            <Navbar />
            <div className={`signin-container ${isDarkMode ? 'dark-mode' : ''}`}>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </div>
        </>
    );
};

export default SignIn;