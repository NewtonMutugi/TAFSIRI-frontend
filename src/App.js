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
import Login from './views/login/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SigninOidc = lazy(() => import('./views/login/signin-oidc'));
const SignoutOidc = lazy(() => import('./views/login/signout-oidc'));
const queryClient = new QueryClient();

const App = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log('Dark mode:', darkMode);
    document.documentElement.classList.toggle('dark', !darkMode); // Tailwind dark mode
    localStorage.setItem('darkMode', darkMode ? 'false' : 'true');
  };

  const theme = getTheme(darkMode ? 'dark' : 'light');
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const isDarkMode = savedMode === 'true' ? true : false;
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);


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
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/signout-oidc" element={<SignoutOidc />} />
              <Route path="/signin-oidc" element={<SigninOidc />} />
              <Route path="/login" element={<Login />} />
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
        </QueryClientProvider>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
