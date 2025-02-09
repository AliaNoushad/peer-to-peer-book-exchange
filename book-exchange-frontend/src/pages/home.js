import React, { useEffect, useState } from 'react';
import BookCard from '../components/bookcard';
import { getBooks } from '../services/bookservice'; // API call for fetching books

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks(); // Fetch books from the backend
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Welcome to Peer-to-Peer Book Exchange</h1>
      <div className="book-list">
        {books.map(book => (
          <BookCard key={book._id} book={book} /> // Display individual books using BookCard component
        ))}
      </div>
    </div>
  );
};

export default Home;