import React, { Suspense } from 'react';
import { Container } from 'reactstrap';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../utils/protectedRoute';
import routes from '../../routes';
import Loader from '../../components/Loader';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className="app">
      <Suspense fallback={<Loader />}>
        <DefaultHeader toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </Suspense>
      <div className="app-body">
        <Container fluid>
          <Routes>
            {routes.map((route) => {
              if (!route.element) return null;
              console.log('route', route);
              return route.private ? (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                  children={route.children}
                />
              ) : (
                <Route
                  key={route.name}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default DefaultLayout;
