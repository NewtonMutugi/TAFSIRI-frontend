import { useEffect } from 'react';
import { signoutRedirect } from '../../utils/UserManager';
import { useNavigate } from 'react-router-dom';

function SignoutOidc() {
  const navigate = useNavigate();

  useEffect(() => {
    async function signoutAsync() {
      await signoutRedirect();
      navigate('/');
    }
    signoutAsync();
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default SignoutOidc;
