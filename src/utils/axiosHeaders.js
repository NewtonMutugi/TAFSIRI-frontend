import Axios from 'axios';

export function setAuthHeader(token) {
  Axios.defaults.headers.common['Authorization'] = token
    ? 'Bearer ' + token
    : '';
}
