import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './utils/AuthProvider';
import userManager, { loadUserFromStorage } from './utils/UserManager';
import { useEffect, Suspense, lazy } from 'react';
import { store } from './store';
import Loader from './components/Loader';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { BrowserRouter as Router } from 'react-router-dom';

const SigninOidc = lazy(() => import('./views/login/signin-oidc'));
const SignoutOidc = lazy(() => import('./views/login/signout-oidc'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUserFromStorage(store);
  }, [dispatch]);

  return (
    <AuthProvider userManager={userManager} store={store}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/signout-oidc" element={<SignoutOidc />} />
            <Route path="/signin-oidc" element={<SigninOidc />} />
            <Route path="/*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
