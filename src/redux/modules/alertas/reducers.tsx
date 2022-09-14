import produce from 'immer';

import {
  SetExibir,
  SetRemover,
  SetConfirmar,
  SetFechar,
  typeExibir,
  typeRemover,
  typeConfirmar,
  typeFechar,
} from './actions';

export interface AlertaProps {
  alertas: Array<any>;
  confirmacao: any;
}

const inicial = {
  alertas: [],
  confirmacao: {
    visivel: false,
    texto: '',
    titulo: '',
    resolve: null,
    textoOk: 'Sim',
    textoCancelar: 'Não',
  },
};

export default function alertas(
  state: AlertaProps = inicial,
  action: SetExibir | SetRemover | SetConfirmar | SetFechar,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeExibir: {
        draft.alertas.push(action.payload);
        break;
      }
      case typeRemover: {
        const indice = draft.alertas.findIndex((alerta) => {
          return alerta.id === action.payload;
        });
        draft.alertas.splice(indice, 1);
        break;
      }
      case typeConfirmar: {
        draft.confirmacao = {
          visivel: true,
          texto: action.payload.texto,
          textoNegrito: action.payload.textoNegrito,
          titulo: action.payload.titulo || 'Atenção',
          resolve: action.payload.resolve,
          textoOk: action.payload.textoOk || 'Sim',
          textoCancelar: action.payload.textoCancelar || 'Não',
          primeiroExibirTextoNegrito: action.payload.primeiroExibirTextoNegrito,
        };
        break;
      }
      case typeFechar: {
        draft.confirmacao = {
          visivel: false,
          texto: '',
          titulo: '',
          resolve: null,
        };
        break;
      }
      default:
        break;
    }
  });
}
