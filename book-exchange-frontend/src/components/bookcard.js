import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.image || '/placeholder.png'} alt={book.title} /> {/* Placeholder for book image */}
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button>Exchange</button> {/* Action button for exchanging */}
    </div>
  );
};

export default BookCard;
