// components/AdminLogin.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; // Import your CSS file for styling

const AdminLogin = () => {
  const history = useHistory(); // Initialize history
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send the username and password to your backend
      const response = await axios.post('https://backendweb-0kwi.onrender.com/admin/login', {
        username,
        password,
      });

      // Handle successful login, e.g., redirect to the admin dashboard
      console.log(response.data);

      // Navigate to the admin dashboard
      history.push('/admin/dashboard');
    } catch (error) {
      console.error('Error during admin login:', error);
      // Handle login error (display error message, etc.)
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <label>
        Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button1 onClick={handleLogin}>Login</button1>
    </div>
  );
};

export default AdminLogin;
