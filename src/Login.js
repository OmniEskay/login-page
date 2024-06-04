import React, { useState } from 'react';
import jsSHA from 'jssha';
import { useNavigate } from 'react-router-dom';

const hashPassword = (password) => {
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(password);
  return shaObj.getHash('HEX');
};

const users = [
  { username: 'ken', password: '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e' }, // password1
  { username: 'ben', password: '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4' }, // password2
  { username: 'user3', password: '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764' }, // password3
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
