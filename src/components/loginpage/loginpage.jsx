import React, { useState } from 'react';
import './login_page.css'; // Import your CSS file for styling

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        setLoggedIn(true);
        setLoginMessage('Logged in!');
      } else {
        setLoginMessage('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('Login failed!');
    }
  };

  return (
    <div className="main-container">
      <div className="main-frame-background1">
        <div className="main-frame">
          <span className="type-username">Log in</span>
          <form onSubmit={handleLogin}>
            <div className="username-input">
              <span className="username-input-1">Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="password-input">
              <span className="password">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="continue-button">
              <button type="submit" className="continue">Continue</button>
            </div>
          </form>
          <div className="login-message">{loginMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
