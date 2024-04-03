const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';

const ADMINID_KEY = 'admin-local-id';
const REFRESH_ADMIN_KEY = 'jwt-refresh-admin-token';
const EXPIRES_ADMIN_KEY = 'jwt-admin-expires';
const TOKEN_ADMIN_KEY = 'jwt-admin-token';

//USER
export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

//ADMIN
export const setAdminTokens = ({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(ADMINID_KEY, localId);
  localStorage.setItem(TOKEN_ADMIN_KEY, idToken);
  localStorage.setItem(REFRESH_ADMIN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_ADMIN_KEY, expiresDate);
};

export function getAdminAccessToken() {
  return localStorage.getItem(TOKEN_ADMIN_KEY);
}

export function getAdminRefreshToken() {
  return localStorage.getItem(REFRESH_ADMIN_KEY);
}

export function getAdminTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_ADMIN_KEY);
}

export function removeAdminAuthData() {
  localStorage.removeItem(ADMINID_KEY);
  localStorage.removeItem(TOKEN_ADMIN_KEY);
  localStorage.removeItem(REFRESH_ADMIN_KEY);
  localStorage.removeItem(EXPIRES_ADMIN_KEY);
}

export function getAdminId() {
  return localStorage.getItem(ADMINID_KEY);
}

export const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  setAdminTokens,
  getAdminAccessToken,
  getAdminRefreshToken,
  getAdminTokenExpiresDate,
  removeAdminAuthData,
  getAdminId
};

export default localStorageService;
