import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Redirect after registration
import { registerUser } from '../services/api'; // API function for registration

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Hook to redirect after registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      history.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
