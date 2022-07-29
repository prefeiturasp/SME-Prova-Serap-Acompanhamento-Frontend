import { AxiosResponse } from 'axios';
import api from './api';

const URL_DEFAULT = '/api/v1/autenticacao';

const autenticarValidar = (codigo: string): Promise<AxiosResponse> =>
  api.post(`${URL_DEFAULT}/validar`, { codigo });

export default {
  autenticarValidar,
};
