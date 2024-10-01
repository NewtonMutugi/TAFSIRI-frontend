import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signinRedirect } from '../utils/UserManager';

function ProtectedRoute({ element: Component, ...rest }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (user) {
    return <Component {...rest} />;
  } else {
    setTimeout(() => {
      signinRedirect();
    }, 2000);
    return <Navigate to="/signin-oidc" state={{ from: location }} />;
  }
}

export default ProtectedRoute;
