// src/Callback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from './UserManager'; // Adjust the path if necessary
import { useAuth } from './AuthProvider'; // Adjust the path if necessary
import { CircularProgress, Box, Typography } from '@mui/material';

const Callback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then((user) => {
        console.log('User signed in:', user);
        setUser(user);
        // Redirect to the home page or any other protected route
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error('Error handling redirect callback:', error);
        // Optionally, redirect to an error page
        navigate('/error', { replace: true });
      });
  }, [navigate, setUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Processing login...
      </Typography>
    </Box>
  );
};

export default Callback;
