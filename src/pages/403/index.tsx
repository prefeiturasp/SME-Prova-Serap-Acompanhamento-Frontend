import { Button, Result } from 'antd';

const NaoAutenticado = () => {
  const URL_SERAP = import.meta.env.VITE_SME_SERAP;

  const voltarAoSerap = () => window.location.replace(URL_SERAP);

  return (
    <Result
      status='403'
      title='Desculpe, você não está autorizado a acessar esta página'
      subTitle='Volte ao SERAp e tente novamente'
      extra={
        <Button type='primary' onClick={() => voltarAoSerap()}>
          Voltar
        </Button>
      }
    />
  );
};

export default NaoAutenticado;
