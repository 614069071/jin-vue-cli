export const storages = {
  set(key, value) {
    if (value && typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  get(key) {
    const value = localStorage.getItem(key) || '';
    let val = null;

    try {
      val = JSON.parse(value);
    } catch (e) {
      return value;
    }

    if (typeof val === 'number') {
      return value;
    }

    return val;
  },
  del(key) {
    localStorage.removeItem(key);
  },
};

export const makeMap = (a) => {
  let o = {};

  a.forEach((e) => (o[e] = true));

  return (k) => !!o[k];
};

export const isTest = process.env.NODE_ENV === 'test';

export const isDeve = process.env.NODE_ENV === 'development';

export const isProd = process.env.NODE_ENV === 'production';
