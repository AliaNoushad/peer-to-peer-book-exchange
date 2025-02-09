import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // To navigate after login
import { loginUser } from '../services/api'; // API function for login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Hook to redirect to profile page after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token); // Store the token for authenticated requests
        history.push('/profile'); // Redirect to profile page
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
