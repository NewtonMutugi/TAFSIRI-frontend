// routes.js
import Loadable from './components/Loadable';
import { lazy } from 'react';
import withTracker from './withTracker';

// Wrap the lazy-loaded components with Loadable and withTracker
const HomePage = withTracker(
  Loadable(lazy(() => import('./views/home/HomePage')))
);
const Tafsiri = withTracker(
  Loadable(lazy(() => import('./views/tafsiri/Tafsiri')))
);

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <HomePage />, // React element
    private: false,
  },
  {
    path: '/tafsiri',
    name: 'TAFSIRI',
    element: <Tafsiri />, // React element
    private: true,
  },
];

export default routes;
