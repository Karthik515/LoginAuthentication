import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  
import './LoginPage.css';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful!') {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        console.log('Login succesfull!');
        openModal(); 
      } else {
        setErrorMessage(response.data.message || 'User not found or incorrect password.');
        setSuccessMessage('');
        
        openModal(); 
      }
    } catch (error) {
      setErrorMessage('User not found.');
      setSuccessMessage('');
      console.log('user not signed in sign in first');
      openModal(); 
    }
  };

  // Open Modal
  const openModal = () => setModalIsOpen(true);

  // Close Modal
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="login-container">
      <div className='top-container'>
        <img className="img" src="./way2.png" alt="Way2News Logo"/>
        <h1 style={{textAlign:"center", color:"gold"}}>Way2News</h1>
      </div>
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
        <button type="submit" className="login-button">
          Log In
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
          <p className={errorMessage ? "error-message" : "success-message"}>
            {errorMessage || successMessage}
          </p>
          <button onClick={closeModal} className="modal-close-button">Close</button>

          {successMessage && (
              <button style={{marginLeft: "50px"}} className="modal-close-button">
                  <Link to="/Home">Continue</Link>
              </button>
            )}

        </div>
      </Modal>

      <p className="signup-link">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
