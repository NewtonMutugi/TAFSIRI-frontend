// HomePage.js
import userManager, {
  signinRedirect,
  signoutRedirect,
} from '../../utils/UserManager'; // Ensure the path is correct
import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Current User is {user ? user.name : 'Not Logged In'}</p>

      {/* Login Button */}
      <button onClick={() => signinRedirect()}>Login</button>

      {/* Logout Button */}
      <button onClick={() => signoutRedirect()}>Logout</button>
    </div>
  );
};

export default HomePage;
