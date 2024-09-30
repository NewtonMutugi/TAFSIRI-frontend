import userManager from '../../utils/UserManager'; // Ensure the path is correct
import { createContext, useContext, useState, useEffect } from 'react';

const HomePage = async () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await userManager.getUser();
        if (currentUser) {
          setUser(currentUser.profile.name);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };
    loadUser();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>current User is {user}</p>
    </div>
  );
};

export default HomePage;
