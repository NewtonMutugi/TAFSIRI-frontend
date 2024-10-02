import { CBreadcrumb as AppBreadcrumb } from '@coreui/react';
import routes from '../../routes';
import { Container } from 'reactstrap';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../utils/protectedRoute';

const DefaultLayout = () => {
  return (
    <div className="app">
      <div className="app-body">
        <AppBreadcrumb approutes={routes} />
        <Container fluid>
          <Routes>
            {routes.map((route) => {
              if (!route.element) return null;

              if (route.private) {
                return (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                  />
                );
              } else {
                return (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={route.element}
                  />
                );
              }
            })}
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default DefaultLayout;
