import axios from "axios";

const config = { timeout: 2000 };

const serve = axios.create(config);

serve.interceptors.request.use(
  config => {
    return config;
  },
  err => Promise.reject(err)
);

serve.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default serve;
