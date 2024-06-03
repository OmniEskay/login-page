import React, { useState } from 'react';
import jsSHA from 'jssha';
import { useNavigate } from 'react-router-dom';

const hashPassword = (password) => {
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(password);
  return shaObj.getHash('HEX');
};

const users = [
  { username: 'ken', password: 'e7cf3ef4f17c3999a94f2c6f612e8a888e5f0c80c345f82d2e18ed6a236e1d64' }, // password1
  { username: 'user2', password: 'b2e98ad6f6eb8508dd6a14cfa704bad7f05f6fb1ffedf6f4d5dd2ef81774e7de' }, // password2
  { username: 'user3', password: 'a21d9af6e0fd5ab4b223c1a1fbe71bdf939748d59dd6a4a48d8eb23e49b676de' }, // password3
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.username === username);
    const hashedPassword = hashPassword(password);
    if (user && user.password === hashedPassword) {
      setMessage('Login successful!');
      navigate('/welcome');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
