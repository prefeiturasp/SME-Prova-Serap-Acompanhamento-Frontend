import { DefaultOptionType } from 'antd/lib/select';
import produce from 'immer';
import { SelectValueType } from '~/domain/type/select';

import {
  SetAbrirFiltroPrincipal,
  SetFiltroAtual,
  typeSetAbrirFiltroPrincipal,
  typeSetFiltroAtual,
} from './actions';

export interface FiltroAtualProps {
  anoLetivo: SelectValueType;
  situacaoProva: SelectValueType;
  prova: SelectValueType;
  modalidade: SelectValueType;
  dre: SelectValueType;
  ue: SelectValueType;
  anoEscolar: SelectValueType;
  turma: SelectValueType;
  anosLetivos: DefaultOptionType[];
  situacoesProvas: DefaultOptionType[];
  provas: DefaultOptionType[];
  modalidades: DefaultOptionType[];
  dres: DefaultOptionType[];
  ues: DefaultOptionType[];
  anosEscolares: DefaultOptionType[];
  turmas: DefaultOptionType[];
}

export interface FiltroPrincipalProps {
  abrirFiltroPrincipal: boolean;
  filtroAtual: FiltroAtualProps;
}

const initialValues = {
  abrirFiltroPrincipal: false,
  filtroAtual: {
    anoLetivo: null,
    situacaoProva: null,
    prova: null,
    modalidade: null,
    dre: null,
    ue: null,
    anoEscolar: null,
    turma: null,
    anosLetivos: [],
    situacoesProvas: [],
    provas: [],
    modalidades: [],
    dres: [],
    ues: [],
    anosEscolares: [],
    turmas: [],
  },
};

const filtroPrincipal = (
  state: FiltroPrincipalProps = initialValues,
  action: SetAbrirFiltroPrincipal | SetFiltroAtual,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeSetAbrirFiltroPrincipal:
        draft.abrirFiltroPrincipal = action.payload;
        break;
      case typeSetFiltroAtual:
        draft.filtroAtual = action.payload;
        break;
      default:
        break;
    }
  });
};

export default filtroPrincipal;
