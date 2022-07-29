import produce from 'immer';

import { SetIsAuthenticated, SetToken, typeSetIsAuthenticated, typeSetToken } from './actions';

export interface AuthProps {
  token: string;
  isAuthenticated: boolean;
}

const initialValues = {
  token: '',
  isAuthenticated: false,
};

const auth = (state: AuthProps = initialValues, action: SetToken | SetIsAuthenticated) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case typeSetToken:
        draft.token = action.payload;
        break;
      case typeSetIsAuthenticated:
        draft.isAuthenticated = action.payload;
        break;
      default:
        break;
    }
  });
};

export default auth;
