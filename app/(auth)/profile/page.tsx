'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // Import RootState to use the Redux store's state

const Profile = () => {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          {/* Render more user details as needed */}
        </div>
      ) : (
        <p>No user data found. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
