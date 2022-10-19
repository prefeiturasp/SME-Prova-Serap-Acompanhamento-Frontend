export const typeExibir = '@alertas/exibir';
export const typeRemover = '@alertas/remover';
export const typeConfirmar = '@alertas/confirmar';
export const typeFechar = '@alertas/fecharConfirmacao';

export interface SetExibir {
  type: typeof typeExibir;
  payload: string;
}
export const exibir = (payload: string): SetExibir => {
  return {
    type: typeExibir,
    payload,
  };
};

export interface SetRemover {
  type: typeof typeRemover;
  payload: number;
}
export const removerAlerta = (id: number): SetRemover => {
  return {
    type: typeRemover,
    payload: id,
  };
};

export interface SetConfirmar {
  type: typeof typeConfirmar;
  payload: any;
}
export const alertaConfirmar = (
  titulo: string,
  texto: string,
  textoNegrito: string,
  resolve: (value: unknown) => void,
  textoOk: string,
  textoCancelar: string,
  primeiroExibirTextoNegrito: string,
): SetConfirmar => {
  return {
    type: typeConfirmar,
    payload: {
      titulo,
      texto,
      textoNegrito,
      resolve,
      textoOk,
      textoCancelar,
      primeiroExibirTextoNegrito,
    },
  };
};

export interface SetFechar {
  type: typeof typeFechar;
}
export const alertaFechar = (): SetFechar => {
  return {
    type: typeFechar,
  };
};
