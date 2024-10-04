import { useSelector } from 'react-redux';
import { Switch } from '@mui/material';
import { signinRedirect, signoutRedirect } from '../../utils/UserManager';
import { ReactComponent as DarkMode } from '../../assets/night.svg';
import { ReactComponent as LightMode } from '../../assets/sun.svg';

const DefaultHeader = ({ toggleDarkMode, darkMode }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 sticky top-0 z-50 backdrop-blur-sm">
      <div className="mx-auto my-2 max-w-screen-xl px-4">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <a href="/" className="text-4xl text-blue-950 dark:text-white">
            TAFSIRI
          </a>

          {/* Navigation Links */}
          {user && (
            <nav aria-label="Global" className="hidden sm:flex sm:gap-4">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-gray-500 dark:text-gray-300" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-300"
                    href="/tafsiri"
                  >
                    Go to application
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 dark:text-gray-300"
                    href="/config"
                  >
                    Configure application
                  </a>
                </li>
              </ul>
            </nav>
          )}

          {/* Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
            />
            <span className="text-gray-500 dark:text-white">
              {darkMode ? (
                <DarkMode className="h-6 w-6" />
              ) : (
                <LightMode className="h-6 w-6" />
              )}
            </span>

            {/* User Info / Login-Logout */}
            {user ? (
              <>
                <span className="text-sm text-gray-500 dark:text-white">
                  Hi👋, {user.profile.FullName}
                </span>
                <button
                  className="bg-teal-600 text-white px-5 py-2 rounded"
                  onClick={signoutRedirect}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="bg-teal-600 text-white px-5 py-2 rounded"
                onClick={signinRedirect}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaultHeader;
