import { UserManager } from 'oidc-client';

let config = {};

config = {
  authority: process.env.REACT_APP_AUTHORITY,
  client_id: process.env.REACT_APP_CLIENT,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  response_type: 'id_token token',
  scope: process.env.REACT_APP_SCOPE,
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  filterProtocolClaims: process.env.REACT_APP_FILTER_PROTOCOL_CLAIMS,
};

const userManager = new UserManager(config);

export default userManager;
