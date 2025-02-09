import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api'; // API call for fetching user profile
import BookCard from '../components/bookcard';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getUserProfile(); // Fetch the logged-in user's profile
      setUser(profileData);
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading if user data is not yet fetched
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <div className="book-list">
        {user.books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
