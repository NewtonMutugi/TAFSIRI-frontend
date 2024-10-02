import { Routes, Route } from 'react-router-dom';
import AuthProvider from './utils/AuthProvider';
import userManager from './utils/UserManager'; // Removed loadUserFromStorage
import { useEffect, Suspense, lazy, useState } from 'react';
import Loader from './components/Loader';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { store } from './store';
import { loadUserFromStorage } from './utils/UserManager';
import { getTheme } from './utils/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

const SigninOidc = lazy(() => import('./views/login/signin-oidc'));
const SignoutOidc = lazy(() => import('./views/login/signout-oidc'));

const App = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode); // Tailwind dark mode
  };

  const theme = getTheme(darkMode ? 'dark' : 'light');
  useEffect(() => {
    // Save mode preference in localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) document.documentElement.classList.add('dark');
  }, []);

  // Save mode preference in localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Check whether it is a sign in redirect
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('#/signin-oidc#')) {
      // Remove the '#/' and any part after the second hash
      const newUrl = currentUrl.replace('#/signin-oidc', 'signin-oidc');
      console.log(`New URL: ${newUrl}`);
      // Navigate to the new URL
      window.location.href = newUrl;
    }
    loadUserFromStorage(store);
  }, []);

  return (
    <AuthProvider userManager={userManager} store={store}>
      <Suspense fallback={<Loader />}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/signout-oidc" element={<SignoutOidc />} />
            <Route path="/signin-oidc" element={<SigninOidc />} />
            <Route
              path="/*"
              element={
                <DefaultLayout
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
              }
            />
          </Routes>
        </ThemeProvider>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
