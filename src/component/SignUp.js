// SignUp.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import Navbar from './Navbar';
import { DarkModeContext } from "../component/DarkModeContext";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNo: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Sign Up Data:', formData);
        navigate('/signin');
    };

    return (
        <>
            <Navbar />
            <div className={`signup-container ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-with-icon">
                            <input
                                className='signup-input'
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-with-icon">
                            <input
                                className='signup-input'
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-with-icon">
                            <input
                                className='signup-input'
                                type="tel"
                                name="phoneNo"
                                placeholder="Phone Number"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-with-icon">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-with-icon">
                            <input
                                className='signup-input'
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-with-icon">
                            <input
                                className='signup-input'
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit">
                            <i className="fas fa-user-plus"></i> Sign Up
                        </button>
                        <button type="submit">
                            <i className="fab fa-google"></i> Sign Up with Google
                        </button>
                    </form>
                    <p className="signin-link">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;