// Account.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      navigate('/signin');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="account-container">
      <h2>Account Settings</h2>
      {user ? (
        <div className="account-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <button onClick={handleSignOut} className="signout-button">Sign Out</button>
        </div>
      ) : null}
    </div>
  );
};

export default Account;