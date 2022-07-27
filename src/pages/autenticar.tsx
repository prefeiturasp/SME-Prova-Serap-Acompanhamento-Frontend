import { Button, Result, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppState } from '~/redux';
import { setIsAuthenticated, setToken } from '~/redux/modules/auth/actions';
import autenticacaoService from '~/services/autenticacao-service';

const ContainerAutenticar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Autenticar: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paramsRouter = useParams();

  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);

  const [autenticando, setAutenticando] = useState(true);

  const URL_SERAP = import.meta.env.VITE_SME_SERAP;

  const voltarAoSerap = () => window.location.replace(URL_SERAP);

  const validarCodigoLogin = useCallback(async () => {
    const codigo = paramsRouter?.codigoValidador || '';

    const resposta = await autenticacaoService.autenticar(codigo);

    dispatch(setToken(resposta.data));

    if (resposta?.data) {
      dispatch(setIsAuthenticated(true));
      dispatch(setToken(resposta.data));
      navigate('/');
    } else {
      setAutenticando(false);
      dispatch(setIsAuthenticated(false));
      dispatch(setToken(''));
    }
  }, [navigate, dispatch, paramsRouter]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     validarCodigoLogin();
  //   } else {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate, validarCodigoLogin]);

  // TODO - remover mock de autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      setAutenticando(true);
      setTimeout(() => {
        setAutenticando(false);
        dispatch(setIsAuthenticated(true));
        navigate('/');
      }, 5000);
    }
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <ContainerAutenticar>
      {!autenticando ? (
        <Spin size='large' />
      ) : (
        <Result
          status='error'
          title='Falha na autenticação'
          extra={[
            <Button type='primary' key='voltar' onClick={() => voltarAoSerap()}>
              Voltar
            </Button>,
            <Button key='tentar-novamente' onClick={() => validarCodigoLogin()}>
              Tentar novamente
            </Button>,
          ]}
        />
      )}
    </ContainerAutenticar>
  );
};

export default Autenticar;
