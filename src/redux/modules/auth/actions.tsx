export const typeSetToken = '@auth/setToken';
export const typeSetIsAuthenticated = '@auth/setIsAuthenticated';

export interface SetToken {
  type: typeof typeSetToken;
  payload: string;
}

export interface SetIsAuthenticated {
  type: typeof typeSetIsAuthenticated;
  payload: boolean;
}

export const setToken = (payload: string): SetToken => {
  return {
    type: typeSetToken,
    payload,
  };
};

export const setIsAuthenticated = (payload: boolean): SetIsAuthenticated => {
  return {
    type: typeSetIsAuthenticated,
    payload,
  };
};
