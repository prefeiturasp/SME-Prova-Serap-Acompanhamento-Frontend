import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Alerta from './index';
import { removerAlerta } from '../../redux/modules/alertas/actions';

// Mock da ação do Redux
jest.mock('../../redux/modules/alertas/actions', () => ({
  removerAlerta: jest.fn(),
}));

// Mock do useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('<Alerta />', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    // Reseta o mock do dispatch antes de cada teste
    dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  it('deve renderizar corretamente o alerta com as propriedades fornecidas', () => {
    const propsAlerta = {
      tipo: 'success',
      mensagem: 'Alerta de sucesso!',
      mensagemClick: 'Clique aqui',
      onClickMessage: jest.fn(),
      closable: 'true',
      id: 1,
      estiloTitulo: {},
      marginBottom: '10px',
      className: 'custom-class',
    };

    render(<Alerta propsAlerta={propsAlerta} />);

    // Verificar se a mensagem e o texto de clique foram renderizados corretamente
    expect(screen.getByText('Alerta de sucesso!')).toBeInTheDocument();
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('deve chamar onClickMessage ao clicar no texto da mensagem', () => {
    const onClickMessage = jest.fn();
    const propsAlerta = {
      tipo: 'info',
      mensagem: 'Alerta com click',
      mensagemClick: 'Clique aqui',
      onClickMessage,
      closable: 'false',
      id: 2,
      estiloTitulo: {},
      marginBottom: '10px',
      className: 'custom-class',
    };

    render(<Alerta propsAlerta={propsAlerta} />);

    // Clicar no texto da mensagem
    fireEvent.click(screen.getByText('Clique aqui'));

    // Verificar se a função onClickMessage foi chamada
    expect(onClickMessage).toHaveBeenCalledTimes(1);
  });

  it('deve chamar dispatch com removerAlerta ao clicar no botão de fechar', () => {
    const propsAlerta = {
      tipo: 'danger',
      mensagem: 'Alerta com erro!',
      mensagemClick: '',
      onClickMessage: jest.fn(),
      closable: 'true',
      id: 3,
      estiloTitulo: {},
      marginBottom: '10px',
      className: 'custom-class',
    };

    render(<Alerta propsAlerta={propsAlerta} />);

    // Clicar no botão de fechar
    fireEvent.click(screen.getByRole('button'));

    // Verificar se o dispatch foi chamado com a ação correta
    expect(dispatch).toHaveBeenCalledWith(removerAlerta(3));
  });
});
