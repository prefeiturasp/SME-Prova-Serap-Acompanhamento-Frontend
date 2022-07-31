import { FiltroAtualProps } from './reducers';

export const typeSetFiltroAtual = '@filtroPrincipal/setFiltroAtual';

export interface SetFiltroAtual {
  type: typeof typeSetFiltroAtual;
  payload: FiltroAtualProps;
}

export const setFiltroAtual = (payload: FiltroAtualProps): SetFiltroAtual => {
  return {
    type: typeSetFiltroAtual,
    payload,
  };
};
