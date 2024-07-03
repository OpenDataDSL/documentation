import React, {useEffect, useState} from 'react';

import {Redirect, useLocation} from '@docusaurus/router';

import Loading from '../Loading';
import {CHECK_DOMAIN, SWA_PATH_LOGIN, SWA_PATH_ME} from '../../constants';

/**
 * In Azure Static Web Apps we can get the user from the /.auth/me endpoint.
 *
 * Example
 * {
 *     "clientPrincipal": {
 *         "identityProvider": "aad",
 *         "userId": "f906824d20b542919bcf31287b89a70e",
 *         "userDetails": "xavier@composabl.io",
 *         "userRoles": [
 *             "anonymous",
 *             "authenticated"
 *         ]
 *     }
 * }
 */
const getUser = async () => {
  const response = await fetch(SWA_PATH_ME);
  const payload = await response.json();
  const {clientPrincipal} = payload;
  return clientPrincipal;
};

export function AuthCheck({children}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const location = useLocation();

  let from = location.pathname;

  if (isLoading) {
    return <Loading />;
  }

  // If we are not logged in, redirect to the login page
  if (!user?.userDetails) {
    window.location.href = `${SWA_PATH_LOGIN}?post_login_redirect_uri=${from}`;
    return <>Authenticating...</>;
  }

  // If we are logged in but not authorized, show a message
  if (
    user?.userDetails &&
    user?.userDetails?.indexOf(`@${CHECK_DOMAIN}`) === -1
  ) {
    return <div>No access</div>;
  }

  return children;
}