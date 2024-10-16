import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importing necessary components from react-router-dom
import AuthForm from './pages/AuthForm';
import BuildingInfo from './pages/BuildingInfoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Tracks logged-in user
  const [authStatus, setAuthStatus] = useState('');

  const handleSignIn = (email, password) => {
    // Replace this logic with real authentication or API call
    if (email === "test@example.com" && password === "password") {
      setUser({ email });
      setAuthStatus(`Welcome, ${email}`);
    } else {
      setAuthStatus("Incorrect email or password.");
    }
  };

  const handleSignUp = (eircode, email, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setAuthStatus("Passwords do not match.");
    } else {
      setUser({ eircode, email });
      setAuthStatus("Sign-up successful! Please sign in.");
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/building-info" /> : <AuthForm onSignIn={handleSignIn} onSignUp={handleSignUp} authStatus={authStatus} />} />
          <Route path="/building-info" element={user ? <BuildingInfo user={user} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
