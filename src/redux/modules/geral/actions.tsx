export const typeSetDataUltimaAtualizacao = '@geral/setDataUltimaAtualizacao';

export interface SetDataUltimaAtualizacao {
  type: typeof typeSetDataUltimaAtualizacao;
  payload: Date | null;
}

export const setDataUltimaAtualizacao = (payload: Date): SetDataUltimaAtualizacao => {
  return {
    type: typeSetDataUltimaAtualizacao,
    payload,
  };
};
