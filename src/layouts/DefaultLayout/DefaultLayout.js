import { CBreadcrumb as AppBreadcrumb } from '@coreui/react';
import routes from '../../routes';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../utils/protectedRoute';

const DefaultLayout = () => {
  return (
    <div className="app">
      <div className="app-body">
        <AppBreadcrumb approutes={routes} router={router} />
        <Container fluid>
          <Routes>
            {routes.map((route, idx) => {
              console.log(route);
              return route.element ? (
                route.private ? (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<ProtectedRoute element={route.element} />}
                  />
                ) : (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<route.element />}
                  />
                )
              ) : null;
            })}
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default DefaultLayout;
