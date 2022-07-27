import axios, { AxiosRequestConfig } from 'axios';

import { store } from '../../redux';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SERAP_ACOMPANHAMENTO_API,
};

const api = axios.create({
  ...config,
});

api.interceptors.request.use((requestConfig) => {
  const { token } = store.getState().auth;
  if (requestConfig.headers) {
    requestConfig.headers = {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return {
      ...requestConfig,
    };
  }

  return {};
});

api.interceptors.response.use(
  (requestConfig) => {
    if (requestConfig?.data?.data) return Promise.resolve(requestConfig.data);
    return requestConfig;
  },
  (error: any) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    if (error?.response?.status === 401) {
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
