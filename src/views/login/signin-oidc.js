import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinRedirectCallback } from '../../utils/UserManager';

function SigninOidc() {
  const navigate = useNavigate();
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback();
      navigate('/tafsiri');
    }
    signinAsync();
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default SigninOidc;
