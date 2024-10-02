// App.js
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './utils/AuthProvider';
import userManager from './utils/UserManager'; // Removed loadUserFromStorage
import { useEffect, Suspense, lazy } from 'react';
import Loader from './components/Loader';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

const SigninOidc = lazy(() => import('./views/login/signin-oidc'));
const SignoutOidc = lazy(() => import('./views/login/signout-oidc'));

const App = () => {
  // Check whether it is a sign in redirect
  useEffect(() => {
    const currentUrl = window.location.href;
    console.log(`Current URL: ${currentUrl}`);
    if (currentUrl.includes('#/signin-oidc#')) {
      // Remove the '#/' and any part after the second hash
      const newUrl = currentUrl.replace('#/signin-oidc', 'signin-oidc');
      console.log(`New URL: ${newUrl}`);
      // Navigate to the new URL
      window.location.href = newUrl;
    }
  }, []);

  return (
    <AuthProvider userManager={userManager}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signout-oidc" element={<SignoutOidc />} />
          <Route path="/signin-oidc" element={<SigninOidc />} />
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
