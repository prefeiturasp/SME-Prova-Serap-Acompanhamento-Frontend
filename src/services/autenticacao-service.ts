import { AxiosResponse } from 'axios';
import api from './api';

const URL_DEFAULT = '/api/v1/autenticacao';
const VITE_CHAVE_API = import.meta.env.VITE_CHAVE_API;

const autenticarValidar = (codigo: string): Promise<AxiosResponse> =>
  api.post(`${URL_DEFAULT}/validar`, { codigo }, { headers: { 'chave-api': VITE_CHAVE_API } });

export default {
  autenticarValidar,
};
