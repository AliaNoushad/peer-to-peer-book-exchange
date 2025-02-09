import React, { useState } from 'react';
import './Searchbar.css'; // Optional: Link to CSS for styling

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as user types
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Pass search term to the parent component
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Searchbar;
