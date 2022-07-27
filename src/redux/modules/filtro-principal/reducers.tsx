import produce from 'immer';

import { SetAbrirFiltroPrincipal, typeSetAbrirFiltroPrincipal } from './actions';

export interface FiltroPrincipalProps {
  abrirFiltroPrincipal: boolean;
}

const initialValues = {
  abrirFiltroPrincipal: false,
};

const filtroPrincipal = (
  state: FiltroPrincipalProps = initialValues,
  action: SetAbrirFiltroPrincipal,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeSetAbrirFiltroPrincipal:
        draft.abrirFiltroPrincipal = action.payload;
        break;
      default:
        break;
    }
  });
};

export default filtroPrincipal;
