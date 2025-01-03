import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import IconeAbrirPopover from './index';

const mockReducer = (state = { abrirFiltroPrincipal: false }, action: any) => {
  switch (action.type) {
    case '@geral/setAbrirFiltroPrincipal':
      return { ...state, abrirFiltroPrincipal: action.payload };
    default:
      return state;
  }
};

describe('<IconeAbrirPopover />', () => {
  it('deve renderizar corretamente e alternar o estado ao clicar', () => {
    const store = configureStore({
      reducer: {
        geral: mockReducer,
      },
    });

    render(
      <Provider store={store}>
        <IconeAbrirPopover />
      </Provider>
    );

    // Verificar o valor inicial do estado
    expect(store.getState().geral.abrirFiltroPrincipal).toBe(false);

    // Disparar o evento de clique
    fireEvent.click(screen.getByRole('button'));

    // Verificar se o estado foi alterado imediatamente após o clique
    expect(store.getState().geral.abrirFiltroPrincipal).toBe(true);
  });
});
