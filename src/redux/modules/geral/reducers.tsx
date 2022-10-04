import produce from 'immer';

import {
  SetAbrirFiltroPrincipal,
  SetCarregarDadosResumoProva,
  SetCarregarDadosTotalizadores,
  SetDataUltimaAtualizacao,
  SetCarregarDadosGraficos,
  typeSetAbrirFiltroPrincipal,
  typeSetCarregarDadosResumoProva,
  typeSetCarregarDadosTotalizadores,
  typeSetCarregarDadosGraficos,
  typeSetDataUltimaAtualizacao,
} from './actions';

export interface GeralProps {
  dataUltimaAtualizacao: Date | null;
  abrirFiltroPrincipal: boolean;
  carregarDadosResumoProva: boolean;
  carregarDadosTotalizadores: boolean;
  carregarDadosGraficos: boolean;
}

const initialValues = {
  dataUltimaAtualizacao: null,
  abrirFiltroPrincipal: false,
  carregarDadosResumoProva: false,
  carregarDadosTotalizadores: false,
  carregarDadosGraficos: false,
};

const geral = (
  state: GeralProps = initialValues,
  action:
    | SetDataUltimaAtualizacao
    | SetAbrirFiltroPrincipal
    | SetCarregarDadosResumoProva
    | SetCarregarDadosTotalizadores
    | SetCarregarDadosGraficos,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeSetDataUltimaAtualizacao:
        draft.dataUltimaAtualizacao = action.payload;
        break;
      case typeSetAbrirFiltroPrincipal:
        draft.abrirFiltroPrincipal = action.payload;
        break;
      case typeSetCarregarDadosResumoProva:
        draft.carregarDadosResumoProva = action.payload;
        break;
      case typeSetCarregarDadosTotalizadores:
        draft.carregarDadosTotalizadores = action.payload;
        break;
      case typeSetCarregarDadosGraficos:
        draft.carregarDadosGraficos = action.payload;
        break;
      default:
        break;
    }
  });
};

export default geral;
