import produce from 'immer';

import {
  SetAbrirFiltroPrincipal,
  SetDataUltimaAtualizacao,
  typeSetAbrirFiltroPrincipal,
  typeSetDataUltimaAtualizacao,
} from './actions';

export interface GeralProps {
  dataUltimaAtualizacao: Date | null;
  abrirFiltroPrincipal: boolean;
}

const initialValues = {
  dataUltimaAtualizacao: null,
  abrirFiltroPrincipal: false,
};

const geral = (
  state: GeralProps = initialValues,
  action: SetDataUltimaAtualizacao | SetAbrirFiltroPrincipal,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeSetDataUltimaAtualizacao:
        draft.dataUltimaAtualizacao = action.payload;
        break;
      case typeSetAbrirFiltroPrincipal:
        draft.abrirFiltroPrincipal = action.payload;
        break;
      default:
        break;
    }
  });
};

export default geral;
