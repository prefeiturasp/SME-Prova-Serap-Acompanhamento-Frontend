import { AxiosResponse } from 'axios';
import api from './api';

const URL_DEFAULT = '/api/v1/autenticar';

const authenticate = (user: string, password: string): Promise<AxiosResponse> =>
  api.post(`${URL_DEFAULT}?user=${user}&password=${password}`);

export default {
  authenticate,
};
