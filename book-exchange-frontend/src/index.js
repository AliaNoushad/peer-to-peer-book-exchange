import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app'; // Main app component
import { BrowserRouter as Router } from 'react-router-dom'; // React Router for routing

// Render the App component inside the root div
ReactDOM.render(
  <Router> 
    <App /> 
  </Router>,
  document.getElementById('root')
);