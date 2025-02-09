import React from 'react';
import './BookList.css'; // Optional: Link to CSS for styling

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <div key={book._id} className="book-item">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-info">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
              <button className="exchange-btn">Exchange</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;