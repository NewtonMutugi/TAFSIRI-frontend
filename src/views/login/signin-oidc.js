import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinRedirectCallback } from '../../utils/UserManager';

function SigninOidc() {
  const navigate = useNavigate();
  useEffect(() => {
    async function signinAsync() {
      try {
        await signinRedirectCallback();
        navigate('/', { replace: true });
      } catch (e) {
        console.error(`Error during signin redirect callback: ${e}`);
        // Handle error appropriately, e.g., show an error message to the user
      }
    }
    signinAsync();
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default SigninOidc;
