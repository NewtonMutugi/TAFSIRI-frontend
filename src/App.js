// src/App.js
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tafsiri from './views/tafsiri/Tafsiri'; // Adjust the path as needed
import userManager from './utils/UserManager'; // Ensure the path is correct

const App = () => {
  useEffect(() => {
    // Handle the redirect callback
    userManager
      .signinRedirectCallback()
      .then((user) => {
        console.log('User signed in:', user);
        // You can redirect to a specific route after login
      })
      .catch((error) => {
        console.error('Error handling redirect callback:', error);
        return;
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin-oidc" element={<div>Loading...</div>} />
        <Route path="/" element={<Tafsiri />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
