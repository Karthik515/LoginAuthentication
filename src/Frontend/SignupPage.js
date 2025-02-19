import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setError('');

    try {
      // Sending request to backend for signup
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
        confirmPassword,
      });

      // If the response status is 201, it means user is created successfully
      if (response.status === 201) {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Display success message
        setSuccessMessage('Signup successful! You can now log in.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Signup failed');
      } else {
        setError('Error during signup. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}

        {error && <p className="error-message">{error}</p>}

      <p className="signup-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
