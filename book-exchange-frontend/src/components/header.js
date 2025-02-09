import React from 'react';
import './Header.css'; // Optional: Link to CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Peer-to-Peer Book Exchange</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/books">Books</a></li>
          <li><a href="/exchange">Exchange</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;