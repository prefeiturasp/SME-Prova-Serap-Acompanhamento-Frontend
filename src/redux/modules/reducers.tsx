import { combineReducers } from 'redux';
import auth from './auth/reducers';
import geral from './geral/reducers';
import filtroPrincipal from './filtro-principal/reducers';

const rootReducer = combineReducers({
  auth,
  geral,
  filtroPrincipal,
});

export default rootReducer;
