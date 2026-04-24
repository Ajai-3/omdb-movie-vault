import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../constants/messages';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const STATUS_ERROR_MAP: Record<number, string> = {
  400: ERROR_MESSAGES.BAD_REQUEST,
  401: ERROR_MESSAGES.UNAUTHORIZED,
  404: ERROR_MESSAGES.NOT_FOUND,
  500: 'Internal Server Error. Please try again later.',
  502: 'Service Unavailable. The movie database is not responding.',
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    let errorMessage = ERROR_MESSAGES.GENERAL;

    if (error.response) {
      const { status, data } = error.response;
      errorMessage = data?.error || data?.message || STATUS_ERROR_MAP[status] || ERROR_MESSAGES.GENERAL;
      toast.error(errorMessage);
    } else if (error.request) {
      toast.error(ERROR_MESSAGES.NETWORK);
    } else {
      console.error('[Interceptor Error]', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;