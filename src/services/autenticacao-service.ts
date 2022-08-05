import { AxiosResponse } from 'axios';
import api from './api';

const URL_DEFAULT = '/api/v1/autenticacao';
export const URL_AUTENTICACAO_REVALIDAR = `${URL_DEFAULT}/revalidar`;
const VITE_CHAVE_API = import.meta.env.VITE_CHAVE_API;

const autenticarValidar = (codigo: string): Promise<AxiosResponse> =>
  api.post(`${URL_DEFAULT}/validar`, { codigo }, { headers: { 'chave-api': VITE_CHAVE_API } });

const autenticarRevalidar = (token: string): Promise<AxiosResponse> =>
  api.post(URL_AUTENTICACAO_REVALIDAR, { token }, { headers: { 'chave-api': VITE_CHAVE_API } });

export default {
  autenticarValidar,
  autenticarRevalidar,
};
