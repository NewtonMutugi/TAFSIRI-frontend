import { lazy } from 'react';

import Loadable from 'components/Loadable';
import Tafsiri from '../views/tafsiri/Tafsiri';

const Tafsiri = Loadable(lazy(() => import('../views/tafsiri/Tafsiri')));

const MainRoutes = {
  path: '/',
  element: <LandingPage />,
  children: [
    {
      path: 'tafsiri',
      element: <Tafsiri />,
    },
  ],
};

export default MainRoutes;
