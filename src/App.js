import { useDispatch } from 'react-redux';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './utils/AuthProvider';
import userManager, { loadUserFromStorage } from './utils/UserManager';
import { useEffect } from 'react';
import { store } from './store';
import Loader from './components/Loader';
import { LOADING_DELAY } from './constants';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

const SigninOidc = Loadable({
  loader: () => import('./views/login/signin-oidc'),
  loading: Loader,
  delay: LOADING_DELAY,
});
const SignoutOidc = Loadable({
  loader: () => import('./views/login/signout-oidc'),
  loading: Loader,
  delay: LOADING_DELAY,
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUserFromStorage(store);
  }, [dispatch]);

  return (
    <AuthProvider userManager={userManager} store={store}>
      <Routes>
        <Route path="/signout-oidc" element={<SignoutOidc />} />
        <Route path="/signin-oidc" element={<SigninOidc />} />
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
