import produce from 'immer';

import { SetDataUltimaAtualizacao, typeSetDataUltimaAtualizacao } from './actions';

export interface GeralProps {
  dataUltimaAtualizacao: Date | null;
}

const initialValues = {
  dataUltimaAtualizacao: null,
};

const geral = (state: GeralProps = initialValues, action: SetDataUltimaAtualizacao) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeSetDataUltimaAtualizacao:
        draft.dataUltimaAtualizacao = action.payload;
        break;
      default:
        break;
    }
  });
};

export default geral;
