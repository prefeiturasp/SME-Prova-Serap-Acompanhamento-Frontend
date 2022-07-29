import { FiltroAtualProps } from './reducers';

export const typeSetAbrirFiltroPrincipal = '@geral/setAbrirFiltroPrincipal';
export const typeSetFiltroAtual = '@geral/setFiltroAtual';

export interface SetAbrirFiltroPrincipal {
  type: typeof typeSetAbrirFiltroPrincipal;
  payload: boolean;
}
export interface SetFiltroAtual {
  type: typeof typeSetFiltroAtual;
  payload: FiltroAtualProps;
}

export const setAbrirFiltroPrincipal = (payload: boolean): SetAbrirFiltroPrincipal => {
  return {
    type: typeSetAbrirFiltroPrincipal,
    payload,
  };
};
export const setFiltroAtual = (payload: FiltroAtualProps): SetFiltroAtual => {
  return {
    type: typeSetFiltroAtual,
    payload,
  };
};
