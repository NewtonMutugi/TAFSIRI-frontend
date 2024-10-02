// ProtectedRoute.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinRedirect } from './UserManager';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      signinRedirect();
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return children;
}

export default ProtectedRoute;
