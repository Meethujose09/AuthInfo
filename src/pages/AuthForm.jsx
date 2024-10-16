import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../assets/logo.png'; // Ensure the logo path is correct

const AuthForm = ({ onSignIn, onSignUp, authStatus }) => {
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [eircode, setEircode] = useState(''); // Only for sign-up

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signin') {
      onSignIn(email, password);
    } else {
      onSignUp(eircode, email, password, passwordConfirm);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md mx-auto space-y-6">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Company Logo" className="h-16 w-auto" />
        </div>

        {/* Headers */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Your Building Info</h2>
        <h2 className="text-center text-xl font-medium text-gray-600">A Sustainable AI-Enabled Energy Management Platform</h2>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-300 focus:outline-none rounded-l-xl ${
              authMode === 'signin'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setAuthMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-300 focus:outline-none rounded-r-xl ${
              authMode === 'signup'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setAuthMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <FaMapMarkerAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your Eircode"
                value={eircode}
                onChange={(e) => setEircode(e.target.value)}
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>

          {authMode === 'signup' && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Confirm your password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform ${
              authMode === 'signin'
                ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:scale-105'
                : 'bg-green-500 hover:bg-green-600 shadow-md hover:scale-105'
            }`}
          >
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>

          {/* Status Message */}
          <div className="mt-4 text-center text-sm text-red-500">{authStatus}</div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
