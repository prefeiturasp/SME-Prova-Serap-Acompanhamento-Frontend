import { Modal, notification } from 'antd';
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

export { exibirAlerta, sucesso, erro, confirmacao, confirmar, fecharModalConfirmacao, aviso };
