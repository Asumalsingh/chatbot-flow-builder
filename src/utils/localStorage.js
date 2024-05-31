const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  return JSON.parse(data);
};

const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
