import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Frontend/LoginForm';
import SignupPage from './Frontend/SignupPage'; 
import HomePage from './Frontend/HomePage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/Home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
