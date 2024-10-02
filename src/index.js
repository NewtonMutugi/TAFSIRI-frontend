import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Clean up URL on initial load
if (window.location.href.includes('#/signin-oidc#')) {
  // const cleanUrl = window.location.href.split('#')[0];
  // // window.history.replaceState({}, document.title, cleanUrl);
  // console.log('Cleaned URL:', cleanUrl);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <RecoilRoot>
          <CookiesProvider>
            <Router>
              <App />
            </Router>
          </CookiesProvider>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
