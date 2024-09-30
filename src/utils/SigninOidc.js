// src/components/SigninOidc.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userManager from '../utils/UserManager'; // Ensure the path is correct

const SigninOidc = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSigninRedirectCallback = async () => {
      try {
        const user = await userManager.signinRedirectCallback();
        console.log('User signed in:', user);
        // Navigate to the Tafsiri page
        navigate('/tafsiri');
      } catch (error) {
        console.error('Error handling redirect callback:', error);
      }
    };

    handleSigninRedirectCallback();
  }, [location, navigate]);

  return <div>Processing login...</div>;
};

export default SigninOidc;
