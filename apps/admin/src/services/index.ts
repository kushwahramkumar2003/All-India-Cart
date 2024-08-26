import config from '@/constants/index';
import axios from 'axios';

axios.defaults.baseURL = config.baseUrl;
axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

export default axiosClient;
