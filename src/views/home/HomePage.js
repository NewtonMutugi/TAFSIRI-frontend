// HomePage.js
import { signinRedirect, signoutRedirect } from '../../utils/UserManager'; // Ensure the path is correct
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Current User is {user ? user.profile.FullName : 'Not Logged In'}</p>

      {user ? (
        <button onClick={() => signoutRedirect()}>Logout</button>
      ) : (
        <button onClick={() => signinRedirect()}>Login</button>
      )}
    </div>
  );
};

export default HomePage;
