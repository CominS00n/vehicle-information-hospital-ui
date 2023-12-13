let storedUsername = {};

export function saveUsername(value) {
  storedUsername = value;
}

export function getStoredUsername() {
  return storedUsername;
}