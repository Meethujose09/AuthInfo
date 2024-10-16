import React, { useState } from 'react';

const AuthForm = ({ onSignIn, onSignUp, authStatus }) => {
  const [authMode, setAuthMode] = useState('signin');
  const [eircode, setEircode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = () => {
    if (authMode === 'signin') {
      onSignIn(email, password);
    } else {
      onSignUp(eircode, email, password, passwordConfirm);
    }
  };

  return (
    <div className="auth-form">
      <div className="btn-group mb-3" role="group">
        <button type="button" className={`btn ${authMode === 'signin' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setAuthMode('signin')}>Sign In</button>
        <button type="button" className={`btn ${authMode === 'signup' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setAuthMode('signup')}>Sign Up</button>
      </div>
      {authMode === 'signup' && (
        <input type="text" className="form-control mb-2" placeholder="Enter your Eircode" value={eircode} onChange={(e) => setEircode(e.target.value)} />
      )}
      <input type="email" className="form-control mb-2" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="form-control mb-2" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {authMode === 'signup' && (
        <input type="password" className="form-control mb-2" placeholder="Confirm your password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      )}
      <button onClick={handleSubmit} className={`btn ${authMode === 'signin' ? 'btn-primary' : 'btn-success'} btn-block`}>
        {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
      <div className="mt-3 text-center">{authStatus}</div>
    </div>
  );
};

export default AuthForm;
