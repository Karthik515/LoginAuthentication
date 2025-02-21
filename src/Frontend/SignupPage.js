import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';  
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import './SignupPage.css'; 

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      openModal(); 
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
        confirmPassword,
      });

      // If response status is 201, user is created successfully
      if (response.status === 201) {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage('Account Created successfully! You can now log in.');

        
        if (response.data.token) {
          // Store the token in localStorage (or sessionStorage)
          localStorage.setItem('authToken', response.data.token);
          console.log('JWT Token stored:', response.data.token);
        }

        console.log('Signup successful!');
        openModal(); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Signup failed');
      } else {
        setError('Error during signup. Please try again.');
      }
      openModal(); 
    }
  };

  // Open Modal
  const openModal = () => setModalIsOpen(true);

  // Close Modal
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className='signup-bg'>
      <div className="signup-container">
        <div className='top-container'>
          <img className="img" src="./way2.png" alt="Way2News Logo" />
          <h1 style={{ textAlign: "center", color: "gold" }}>Way2News</h1>
        </div>
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
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <div className="password-container">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Message Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="modal-message">
            <p className={error ? "error-message" : "success-message"}>
              {error || successMessage}
            </p>
            <button onClick={closeModal} className="modal-close-button">Close</button>
          </div>
        </Modal>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
