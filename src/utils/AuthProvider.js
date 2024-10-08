import React, { useEffect, useRef } from 'react';
import { setAuthHeader } from './axiosHeaders';
import { storeUser } from './AuthActions';

function AuthProvider({ userManager: manager, store, children }) {
  let userManager = useRef();

  useEffect(() => {
    userManager.current = manager;

    const onUserLoaded = (user) => {
      store.dispatch(storeUser(user));
    };

    const onUserUnloaded = () => {
      setAuthHeader(null);
    };

    const onAccessTokenExpiring = () => {
      console.log(`user token expiring`);
    };

    const onAccessTokenExpired = () => {
      console.log(`user token expired`);
    };

    const onUserSignedOut = () => {
      console.log(`user signed out`);
    };

    // events for user
    userManager.current.events.addUserLoaded(onUserLoaded);
    userManager.current.events.addUserUnloaded(onUserUnloaded);
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring);
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.current.events.addUserSignedOut(onUserSignedOut);

    // Specify how to clean up after this effect:
    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(
        onAccessTokenExpiring
      );
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired);
      userManager.current.events.removeUserSignedOut(onUserSignedOut);
    };
  }, [manager, store]);

  return React.Children.only(children);
}

export default AuthProvider;
