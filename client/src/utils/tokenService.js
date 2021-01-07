import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config/constants';

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
