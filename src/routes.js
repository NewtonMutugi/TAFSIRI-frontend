// routes.js
import Loadable from './components/Loadable';
import { lazy } from 'react';
import withTracker from './withTracker';

// Wrap the lazy-loaded components with Loadable and withTracker
const HomePage = withTracker(
  Loadable(lazy(() => import('./views/home/LandingPage')))
);
const Tafsiri = withTracker(
  Loadable(lazy(() => import('./views/tafsiri/Tafsiri')))
);
const ListConfigs = withTracker(
  Loadable(lazy(() => import('./views/config/configs')))
);
const AddConfig = Loadable(lazy(() => import('./views/config/AddConfig')));

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
  {
    path: '/config',
    name: 'List Configs',
    element: <ListConfigs />,
    private: true,
  },
  {
    path: '/config/add',
    name: 'Add Config',
    element: <AddConfig />,
    private: true,
  },
];

export default routes;
