import userManager from '../../utils/UserManager'; // Ensure the path is correct
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Current User is {user}</p>
      {/* // login button */}

      <button onClick={() => userManager.signinRedirect()}>Login</button>

      <button onClick={() => userManager.signoutRedirect()}>Logout</button>

      {/* // logout button */}
    </div>
  );
};

export default HomePage;
