import { useEffect } from 'react';
import { signinRedirect } from '../../utils/UserManager';
const Login = () => {
  useEffect(() => {
    signinRedirect();
  }, []);
  return null;
};

export default Login;
