import { useSelector } from 'react-redux';
import { signinRedirect, signoutRedirect } from '../../utils/UserManager';

const DefaultHeader = () => {
  // Tailwind CSS navbar for tafsiri
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white">
      <div className="mx-auto my-2 max-w-screen-xl px-4 ">
        <div className="flex justify-between">
          <div className="justify-items-start  md:flex md:items-center md:gap-12">
            <a className=" text-blue-950" href="/">
              {/* Tafsiri logo svg */}
              <div className="text-4xl">TAFSIRI</div>
            </a>
          </div>

          {/* Hidden navigation links */}
          {/* <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {' '}
                    About{' '}
                  </a>
                </li>
              </ul>
            </nav>
          </div> */}

          <div className="flex flex-row justify-items-end gap-4">
            {user ? (
              <div className="flex flex-col justify-center sm:flex sm:gap-4">
                <div className="text-sm  text-gray-500">
                  Hello, {user.profile.FullName}
                </div>
              </div>
            ) : null}
            {user ? (
              <div className="sm:flex sm:gap-4 cursor-pointer">
                <div
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={() => signoutRedirect()}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4 cursor-pointer">
                <div
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={() => signinRedirect()}
                >
                  Login
                </div>
              </div>
            )}

            {/* Hamburger menu for smaller devices*/}
            {/* <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaultHeader;
