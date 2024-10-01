import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Tafsiri from './views/tafsiri/Tafsiri'; // Adjust the path as needed
import AuthProvider from './utils/AuthProvider'; // Adjust the path as needed
import userManager, { loadUserFromStorage } from './utils/UserManager';
import { useEffect } from 'react';
import { store } from './store';
import Loader from './components/Loader';
import { LOADING_DELAY } from './constants';
import HomePage from './views/home/HomePage';

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
        <Route path="/signout-oidc" component={SignoutOidc} />
        <Route path="/signin-oidc" component={SigninOidc} />
        <Route path="/tafsiri" element={<Tafsiri />} />
        <Route
          path="/"
          name="Home"
          render={(props) => <HomePage {...props} />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
