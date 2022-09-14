import { Modal, notification } from 'antd';
//import { CANCELADO_USUARIO, TOKEN_EXPIRADO } from '~/constantes';
import { store } from '../redux';
import { alertaConfirmar, alertaFechar } from '../redux/modules/alertas/actions';

const { confirm } = Modal;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const exibirAlerta = (tipo: NotificationType, mensagem: string) => {
  let titulo: string;
  let classeTipo: string;
  switch (tipo) {
    case 'success':
      titulo = 'Sucesso';
      classeTipo = 'alerta-sucesso';
      break;
    case 'error':
      titulo = 'Erro';
      classeTipo = 'alerta-erro';
      break;
    case 'warning':
      titulo = 'Aviso';
      classeTipo = 'alerta-aviso';
      break;

    default:
      titulo = '';
      classeTipo = '';
      break;
  }
  notification[tipo]({
    message: titulo,
    description: mensagem,
    duration: 6,
    className: classeTipo,
  });
};

const sucesso = (mensagem: string) => {
  exibirAlerta('success', mensagem);
};

const erro = (mensagem: string) => {
  exibirAlerta('error', mensagem);
};

const aviso = (mensagem: string) => {
  exibirAlerta('warning', mensagem);
};

/*
const acharErro = (dados: string, resposta: string) => {
  return dados?.indexOf(resposta) >= 0;
};

const erros = (listaErros: Array<any>) => {
  const temErroIgual =
    acharErro(listaErros?.message, TOKEN_EXPIRADO) ||
    acharErro(listaErros?.message, CANCELADO_USUARIO);
  const state = store.getState();

  if (!state?.usuario?.logado || temErroIgual) return;
  if (listaErros?.response?.data?.mensagens) {
    listaErros.response.data.mensagens.forEach((mensagem) => erro(mensagem));
    return;
  }
  erro('Ocorreu um erro interno.');
};
*/

const confirmacao = (
  titulo: string,
  texto: string,
  confirmar: () => void,
  cancelar: () => void,
  okText: string,
  okType: undefined,
  cancelText: string,
) => {
  confirm({
    title: titulo,
    content: texto,
    okText: okText || 'Confirmar',
    okType: okType || 'primary',
    cancelText: cancelText || 'Cancelar',
    onOk() {
      confirmar();
    },
    onCancel() {
      cancelar();
    },
  });
};

const confirmar = (
  titulo: string,
  texto: string,
  textoNegrito: string,
  textoOk: string,
  textoCancelar: string,
  primeiroExibirTextoNegrito: string,
) => {
  return new Promise((resolve, _) => {
    store.dispatch(
      alertaConfirmar(
        titulo,
        texto,
        textoNegrito,
        resolve,
        textoOk,
        textoCancelar,
        primeiroExibirTextoNegrito,
      ),
    );
  });
};

const fecharModalConfirmacao = () => {
  store.dispatch(alertaFechar());
};

export {
  exibirAlerta,
  sucesso,
  erro,
  confirmacao,
  confirmar,
  fecharModalConfirmacao,
  //erros,
  aviso,
};
