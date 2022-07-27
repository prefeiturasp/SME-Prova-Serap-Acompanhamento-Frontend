import { AppState } from '~/redux';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '~/redux/modules/auth/actions';

const Autenticar: React.FC<any> = () => {
  const [autenticando, setAutenticando] = useState(false);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      setAutenticando(true);
      setTimeout(() => {
        setAutenticando(false);
        dispatch(setIsAuthenticated(true));
      }, 5000);
    }
  }, [dispatch, isAuthenticated]);

  return <div>{autenticando ? <div>Autenticando...</div> : <div>Autenticado</div>}</div>;
};

export default Autenticar;
