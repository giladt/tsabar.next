import "client-only";

export function getLocalStorage(key: string, defaultValue: unknown) {
  const stickyValue = localStorage.getItem(key);
  return (stickyValue !== null && stickyValue !== 'undefined')
    ? JSON.parse(stickyValue)
    : defaultValue;
}

export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}