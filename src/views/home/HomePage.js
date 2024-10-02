// HomePage.js
import { useNavigate } from 'react-router-dom';
import { signinRedirect, signoutRedirect } from '../../utils/UserManager'; // Ensure the path is correct
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Current User is {user ? user.profile.FullName : 'Not Logged In'}</p>

      {user ? (
        <>
          <button onClick={() => signoutRedirect()}>Logout</button>
          <button onClick={() => navigate('/tafsiri')}>Tafsiri</button>
        </>
      ) : (
        <button onClick={() => signinRedirect()}>Login</button>
      )}
    </div>
  );
};

export default HomePage;
