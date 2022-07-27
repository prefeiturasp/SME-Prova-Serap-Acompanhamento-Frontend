export const typeSetAbrirFiltroPrincipal = '@geral/setAbrirFiltroPrincipal';

export interface SetAbrirFiltroPrincipal {
  type: typeof typeSetAbrirFiltroPrincipal;
  payload: boolean;
}

export const setAbrirFiltroPrincipal = (payload: boolean): SetAbrirFiltroPrincipal => {
  return {
    type: typeSetAbrirFiltroPrincipal,
    payload,
  };
};
