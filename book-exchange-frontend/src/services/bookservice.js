import axios from 'axios';

// Get the list of books
export const getBooks = async () => {
  const response = await axios.get('/api/books'); // Replace with your backend API endpoint
  return response.data;
};

// Add a new book
export const addBook = async (bookData) => {
  const response = await axios.post('/api/books', bookData); // Replace with your backend API endpoint
  return response.data;
};
