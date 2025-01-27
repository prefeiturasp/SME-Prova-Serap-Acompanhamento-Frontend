import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CamposFiltroPrincipal from './index'; 
import { setFiltroAtual } from '~/redux/modules/filtro-principal/actions';
import { setAbrirFiltroPrincipal } from '~/redux/modules/geral/actions';
import { useDispatch, useSelector } from 'react-redux';

// Mock do Redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('<CamposFiltroPrincipal />', () => {
  const mockDispatch = jest.fn();

  // Mock da store Redux e dos estados iniciais
  const initialState = {
    geral: {
      abrirFiltroPrincipal: true,
    },
    filtroPrincipal: {
      anoLetivo: '2021',
      situacaoProva: 'Aprovado',
      prova: 'Prova 1',
      modalidade: 'Modalidade 1',
      dre: 'DRE 1',
      ue: 'UE 1',
      anoEscolar: 'Ano 1',
      turma: 'Turma 1',
      anosLetivos: [{ label: '2021', value: '2021' }],
      situacoesProvas: [{ label: 'Aprovado', value: 'Aprovado' }],
      provas: [{ label: 'Prova 1', value: 'Prova 1' }],
      modalidades: [{ label: 'Modalidade 1', value: 'Modalidade 1' }],
      dres: [{ label: 'DRE 1', value: 'DRE 1' }],
      ues: [{ label: 'UE 1', value: 'UE 1' }],
      anosEscolares: [{ label: 'Ano 1', value: 'Ano 1' }],
      turmas: [{ label: 'Turma 1', value: 'Turma 1' }],
    },
  };

  // Mock da função `useDispatch` e `useSelector`
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn(initialState)
    );
  });

  // Definir um reducer básico mockado para a store
  const mockReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case '@filtro-principal/setFiltroAtual':
        return { ...state, filtroPrincipal: action.payload };
      case '@geral/setAbrirFiltroPrincipal':
        return { ...state, geral: { abrirFiltroPrincipal: action.payload } };
      default:
        return state;
    }
  };

  // precisa de correção
  xit('deve renderizar os campos de filtro e o botão', () => {
    render(
      <Provider store={configureStore({ reducer: mockReducer })}>
        <CamposFiltroPrincipal />
      </Provider>
    );

    // Verificar se o botão "Aplicar filtro" é renderizado
    expect(screen.getByRole('button', { name: /aplicar filtro/i })).toBeInTheDocument();
  });

  // precisa de correção
  xit('deve despachar a ação com os valores do formulário ao submeter', async () => {
    render(
      <Provider store={configureStore({ reducer: mockReducer })}>
        <CamposFiltroPrincipal />
      </Provider>
    );

    // Simular a mudança nos campos do formulário (por exemplo, alterando o ano letivo)
    fireEvent.change(screen.getByLabelText('Ano Letivo'), {
      target: { value: '2022' },
    });

    // Simular o clique no botão "Aplicar filtro"
    fireEvent.click(screen.getByRole('button', { name: /aplicar filtro/i }));

    // Verificar se as ações de Redux estão sendo despachadas com os valores corretos
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        setFiltroAtual({
          anoLetivo: '2022',
          situacaoProva: 'Aprovado',
          prova: ['Prova 1'],
          modalidade: 'Modalidade 1',
          dre: 'DRE 1',
          ue: 'UE 1',
          anoEscolar: 'Ano 1',
          turma: 'Turma 1',
          anosLetivos: [{ label: '2021', value: '2021' }],
          situacoesProvas: [{ label: 'Aprovado', value: 'Aprovado' }],
          provas: [{ label: 'Prova 1', value: 'Prova 1' }],
          modalidades: [{ label: 'Modalidade 1', value: 'Modalidade 1' }],
          dres: [{ label: 'DRE 1', value: 'DRE 1' }],
          ues: [{ label: 'UE 1', value: 'UE 1' }],
          anosEscolares: [{ label: 'Ano 1', value: 'Ano 1' }],
          turmas: [{ label: 'Turma 1', value: 'Turma 1' }],
        })
      );
      expect(mockDispatch).toHaveBeenCalledWith(setAbrirFiltroPrincipal(false));
    });
  });
});
