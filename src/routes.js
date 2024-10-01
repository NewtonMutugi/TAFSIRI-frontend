import Loadable from './components/Loadable';
import { lazy } from 'react';
import withTracker from './withTracker';

const HomePage = Loadable(lazy(() => import('./views/home/HomePage')));
const Tafsiri = Loadable(lazy(() => import('./views/tafsiri/Tafsiri')));

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    element: withTracker(HomePage),
    private: false,
  },
  {
    path: '/tafsiri',
    exact: true,
    name: 'TAFSIRI',
    private: true,
    element: withTracker(Tafsiri),
  },
];

export default routes;
