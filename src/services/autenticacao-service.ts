import { AxiosResponse } from 'axios';
import api from './api';

const URL_DEFAULT = '/api/v1/autenticacao';

const autenticar = (codigo: string): Promise<AxiosResponse> => api.post(URL_DEFAULT, { codigo });

export default {
  autenticar,
};
