const storageKey = 'user_info';

let userInfo = JSON.parse(localStorage.getItem(storageKey)) || {};

export function saveUserInfo(info) {
  userInfo = info;
  localStorage.setItem(storageKey, JSON.stringify(userInfo));
}

export function getUserInfo() {
  return userInfo;
}

export function removeUserInfo() {
  userInfo = {};
  localStorage.removeItem(storageKey);
}

export function isAuthenticated() {
  return Object.keys(userInfo).length !== 0;
}
