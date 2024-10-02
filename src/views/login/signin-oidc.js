// SigninOidc.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinRedirectCallback } from '../../utils/UserManager';

function SigninOidc() {
  const history = useNavigate();
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback();
      history('/');
    }
    signinAsync();
  }, [history]);

  return <div>Redirecting...</div>;
}

export default SigninOidc;
