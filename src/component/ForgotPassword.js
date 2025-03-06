// ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import Navbar from './Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password Reset Email Sent to:', email);
  };

  return (
    <div className="auth-container">
      <Navbar/>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      <p>
        <Link to="/signin">Back to Sign In</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
