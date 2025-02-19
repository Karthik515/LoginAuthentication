import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginPage.css'; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
  
      // Check if the response message is 'Login successful!' 
      if (response.data.message === 'Login successful!') {
        setSuccessMessage(response.data.message); // Set success message
        setErrorMessage(''); // Clear error message
      } else {
        setErrorMessage(response.data.message || 'User not found or incorrect password.'); // Display server message or fallback error
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      setErrorMessage('user not found.');
      setSuccessMessage(''); // Clear success message on error
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}         
       <p className="signup-link">
            Dont have an account? <Link to="/signup">signup here</Link>
        </p>
        </div>
      );
};
export default LoginForm






