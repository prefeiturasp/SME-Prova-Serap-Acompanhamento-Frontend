import { Button, Result } from 'antd';

const PagNotFound = () => {
  const URL_SERAP = import.meta.env.VITE_SME_SERAP;

  const voltarAoSerap = () => window.location.replace(URL_SERAP);

  return (
    <Result
      status='404'
      title='404'
      subTitle='Desculpe, a página que você visitou não existe ou não possível fazer o login'
      extra={
        <Button type='primary' onClick={() => voltarAoSerap()}>
          Voltar ao SERAp
        </Button>
      }
    />
  );
};

export default PagNotFound;
