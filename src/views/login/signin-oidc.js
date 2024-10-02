import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinRedirectCallback } from '../../utils/UserManager';

function SigninOidc() {
  const navigate = useNavigate();
  useEffect(() => {
    async function signinAsync() {
      try {
        await signinRedirectCallback();
      } catch (e) {
        console.error(e);
      }
      navigate('/');
    }
    signinAsync();
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default SigninOidc;
