import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Frontend/LoginForm';
import SignupPage from './Frontend/SignupPage'; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;
