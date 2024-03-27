import axios from 'axios';
import store from '../redux/store';
import { clearStore } from '../redux/userSlice';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(clearStore());
    }
    return Promise.reject(error);
  }
);