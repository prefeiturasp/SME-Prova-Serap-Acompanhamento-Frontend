export const typeSetDataUltimaAtualizacao = '@geral/setDataUltimaAtualizacao';
export const typeSetAbrirFiltroPrincipal = '@geral/setAbrirFiltroPrincipal';

export interface SetDataUltimaAtualizacao {
  type: typeof typeSetDataUltimaAtualizacao;
  payload: Date | null;
}

export interface SetAbrirFiltroPrincipal {
  type: typeof typeSetAbrirFiltroPrincipal;
  payload: boolean;
}

export const setDataUltimaAtualizacao = (payload: Date): SetDataUltimaAtualizacao => {
  return {
    type: typeSetDataUltimaAtualizacao,
    payload,
  };
};

export const setAbrirFiltroPrincipal = (payload: boolean): SetAbrirFiltroPrincipal => {
  return {
    type: typeSetAbrirFiltroPrincipal,
    payload,
  };
};
