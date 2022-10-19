import { combineReducers } from 'redux';
import auth from './auth/reducers';
import filtroPrincipal from './filtro-principal/reducers';
import alertas from './alertas/reducers';
import geral from './geral/reducers';

const rootReducer = combineReducers({
  auth,
  geral,
  filtroPrincipal,
  alertas,
});

export default rootReducer;
